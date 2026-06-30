import { PrismaService } from '@infrastructure/database/prisma.service';
import { PrismaMasterService } from '@infrastructure/database/prisma-master.service';
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

import { MailService } from '../mail/mail.service';

import { ChangePasswordDto } from './dto/change-password.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly prismaMaster: PrismaMasterService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly mailService: MailService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: loginDto.email }});

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!user.isActive) {
      await this.prisma.auditLog.create({
        data: {
          
          userId: user.id,
          type: 'LOGIN_HISTORY',
          action: 'LOGIN_FAILED',
          changes: { reason: 'User account is inactive' }}});
      throw new UnauthorizedException('User account is inactive');
    }

    const isPasswordValid = await bcrypt.compare(loginDto.password, user.passwordHash);

    if (!isPasswordValid) {
      await this.prisma.auditLog.create({
        data: {
          
          userId: user.id,
          type: 'LOGIN_HISTORY',
          action: 'LOGIN_FAILED',
          changes: { reason: 'Invalid password' }}});
      throw new UnauthorizedException('Invalid credentials');
    }

    await this.prisma.auditLog.create({
      data: {
        
        userId: user.id,
        type: 'LOGIN_HISTORY',
        action: 'LOGIN_SUCCESS'}});

    const payload = { sub: user.id, email: user.email};

    return {
      accessToken: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName}};
  }

  async loginSuperAdmin(loginDto: LoginDto) {
    const admin = await this.prismaMaster.superAdmin.findUnique({
      where: { email: loginDto.email }});

    if (!admin) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (!admin.isActive) {
      throw new UnauthorizedException('Super Admin account is inactive');
    }

    const isPasswordValid = await bcrypt.compare(loginDto.password, admin.passwordHash);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: admin.id, email: admin.email, isSuperAdmin: true };

    return {
      accessToken: this.jwtService.sign(payload),
      user: {
        id: admin.id,
        email: admin.email,
        firstName: admin.firstName,
        lastName: admin.lastName,
        isSuperAdmin: true}};
  }

  async changePassword(userId: string, dto: ChangePasswordDto) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new UnauthorizedException('User not found');

    const isPasswordValid = await bcrypt.compare(dto.oldPassword, user.passwordHash);
    if (!isPasswordValid) {
      throw new BadRequestException('Old password is incorrect');
    }

    const saltRounds = 10;
    const newPasswordHash = await bcrypt.hash(dto.newPassword, saltRounds);

    await this.prisma.user.update({
      where: { id: userId },
      data: { passwordHash: newPasswordHash }});

    return { message: 'Password successfully changed' };
  }

  async logout(userId: string) {
    // In a stateless JWT implementation, logout is usually handled client-side by deleting the token.
    // If token invalidation is required, we can implement a token blacklist here.
    return { message: 'Successfully logged out' };
  }

  async forgotPassword(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      // Return a generic message to prevent email enumeration
      return {
        message:
          'If that email address is in our database, we will send you an email to reset your password.'};
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetPasswordExpires = new Date(Date.now() + 3600000); // 1 hour

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        resetPasswordToken: resetToken,
        resetPasswordExpires,
      },
    });

    await this.mailService.sendPasswordReset(user.email, resetToken);

    return {
      message:
        'If that email address is in our database, we will send you an email to reset your password.'};
  }

  async resetPassword(token: string, newPassword: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        resetPasswordToken: token,
        resetPasswordExpires: { gt: new Date() },
      },
    });

    if (!user) {
      throw new BadRequestException('Password reset token is invalid or has expired.');
    }

    const saltRounds = 10;
    const newPasswordHash = await bcrypt.hash(newPassword, saltRounds);

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        passwordHash: newPasswordHash,
        resetPasswordToken: null,
        resetPasswordExpires: null,
      },
    });

    return { message: 'Password successfully reset' };
  }

  async verifyEmail(token: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        emailVerificationToken: token,
      },
    });

    if (!user) {
      throw new BadRequestException('Email verification token is invalid.');
    }

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        isEmailVerified: true,
        emailVerificationToken: null,
      },
    });

    return { message: 'Email successfully verified' };
  }

  async getInstituteFeatures(tenantId: string) {
    if (!tenantId) return { type: 'General', features: [] };

    try {
      const institute = await this.prismaMaster.institute.findUnique({
        where: { id: tenantId },
        include: {
          subscriptions: {
            where: { status: 'ACTIVE' },
            include: {
              plan: true
            }
          }
        }
      });

      if (!institute) return { type: 'General', features: [] };

      const type = (institute as any).type || 'General';

      if (!institute.subscriptions || institute.subscriptions.length === 0) {
        return { type, features: [] };
      }

      const activePlan = institute.subscriptions[0].plan;
      if (!activePlan || !activePlan.features) {
        return { type, features: [] };
      }

      return { type, features: activePlan.features as string[] };
    } catch (e) {
      console.error('Error fetching institute features:', e);
      return { type: 'General', features: [] };
    }
  }
}

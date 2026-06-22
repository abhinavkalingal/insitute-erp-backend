import { PrismaService } from '@infrastructure/database/prisma.service';
import { PrismaMasterService } from '@infrastructure/database/prisma-master.service';
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { ChangePasswordDto } from './dto/change-password.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly prismaMaster: PrismaMasterService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
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

    // TODO: Generate reset token, save to DB, and send email (Step 11)
    return {
      message:
        'If that email address is in our database, we will send you an email to reset your password.'};
  }

  async resetPassword(token: string, newPassword: string) {
    // TODO: Validate reset token, hash new password, update DB
    return { message: 'Password successfully reset' };
  }

  async verifyEmail(token: string) {
    // TODO: Validate verification token, update user isEmailVerified flag
    return { message: 'Email successfully verified' };
  }
}

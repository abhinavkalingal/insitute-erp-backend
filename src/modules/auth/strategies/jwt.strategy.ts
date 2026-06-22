import { PrismaService } from '@infrastructure/database/prisma.service';
import { PrismaMasterService } from '@infrastructure/database/prisma-master.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export interface JwtPayload {
  sub: string;
  email: string;
  instituteId: string | null;
  isSuperAdmin?: boolean;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
    private readonly prismaMaster: PrismaMasterService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET') as string});
  }

  async validate(payload: JwtPayload) {
    if (payload.isSuperAdmin) {
      const admin = await this.prismaMaster.superAdmin.findUnique({
        where: { id: payload.sub }});
      if (!admin || !admin.isActive) {
        throw new UnauthorizedException('Super Admin is inactive or not found');
      }
      return {
        id: payload.sub,
        email: payload.email,
        isSuperAdmin: true,
        permissions: [
          'manage:platform',
          'manage:saas',
          'read:saas',
          'update:saas',
          'delete:saas',
          'read:institutes',
          'create:institutes',
          'update:institutes',
          'delete:institutes',
        ]};
    }

    const user = await this.prisma.user.findUnique({
      where: { id: payload.sub }});
    if (!user || !user.isActive) {
      throw new UnauthorizedException('User is inactive or not found');
    }
    return {
      id: payload.sub,
      email: payload.email};
  }
}

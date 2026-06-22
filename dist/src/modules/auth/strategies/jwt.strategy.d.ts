import { PrismaService } from "../../../infrastructure/database/prisma.service";
import { PrismaMasterService } from "../../../infrastructure/database/prisma-master.service";
import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-jwt';
export interface JwtPayload {
    sub: string;
    email: string;
    instituteId: string | null;
    isSuperAdmin?: boolean;
}
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly configService;
    private readonly prisma;
    private readonly prismaMaster;
    constructor(configService: ConfigService, prisma: PrismaService, prismaMaster: PrismaMasterService);
    validate(payload: JwtPayload): Promise<{
        id: string;
        email: string;
        isSuperAdmin: boolean;
        permissions: string[];
    } | {
        id: string;
        email: string;
        isSuperAdmin?: undefined;
        permissions?: undefined;
    }>;
}
export {};

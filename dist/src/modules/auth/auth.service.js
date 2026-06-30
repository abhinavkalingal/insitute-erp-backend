"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const prisma_service_1 = require("../../infrastructure/database/prisma.service");
const prisma_master_service_1 = require("../../infrastructure/database/prisma-master.service");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = __importStar(require("bcrypt"));
const crypto = __importStar(require("crypto"));
const mail_service_1 = require("../mail/mail.service");
let AuthService = class AuthService {
    prisma;
    prismaMaster;
    jwtService;
    configService;
    mailService;
    constructor(prisma, prismaMaster, jwtService, configService, mailService) {
        this.prisma = prisma;
        this.prismaMaster = prismaMaster;
        this.jwtService = jwtService;
        this.configService = configService;
        this.mailService = mailService;
    }
    async login(loginDto) {
        const user = await this.prisma.user.findUnique({
            where: { email: loginDto.email }
        });
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        if (!user.isActive) {
            await this.prisma.auditLog.create({
                data: {
                    userId: user.id,
                    type: 'LOGIN_HISTORY',
                    action: 'LOGIN_FAILED',
                    changes: { reason: 'User account is inactive' }
                }
            });
            throw new common_1.UnauthorizedException('User account is inactive');
        }
        const isPasswordValid = await bcrypt.compare(loginDto.password, user.passwordHash);
        if (!isPasswordValid) {
            await this.prisma.auditLog.create({
                data: {
                    userId: user.id,
                    type: 'LOGIN_HISTORY',
                    action: 'LOGIN_FAILED',
                    changes: { reason: 'Invalid password' }
                }
            });
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        await this.prisma.auditLog.create({
            data: {
                userId: user.id,
                type: 'LOGIN_HISTORY',
                action: 'LOGIN_SUCCESS'
            }
        });
        const payload = { sub: user.id, email: user.email };
        return {
            accessToken: this.jwtService.sign(payload),
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName
            }
        };
    }
    async loginSuperAdmin(loginDto) {
        const admin = await this.prismaMaster.superAdmin.findUnique({
            where: { email: loginDto.email }
        });
        if (!admin) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        if (!admin.isActive) {
            throw new common_1.UnauthorizedException('Super Admin account is inactive');
        }
        const isPasswordValid = await bcrypt.compare(loginDto.password, admin.passwordHash);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const payload = { sub: admin.id, email: admin.email, isSuperAdmin: true };
        return {
            accessToken: this.jwtService.sign(payload),
            user: {
                id: admin.id,
                email: admin.email,
                firstName: admin.firstName,
                lastName: admin.lastName,
                isSuperAdmin: true
            }
        };
    }
    async changePassword(userId, dto) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user)
            throw new common_1.UnauthorizedException('User not found');
        const isPasswordValid = await bcrypt.compare(dto.oldPassword, user.passwordHash);
        if (!isPasswordValid) {
            throw new common_1.BadRequestException('Old password is incorrect');
        }
        const saltRounds = 10;
        const newPasswordHash = await bcrypt.hash(dto.newPassword, saltRounds);
        await this.prisma.user.update({
            where: { id: userId },
            data: { passwordHash: newPasswordHash }
        });
        return { message: 'Password successfully changed' };
    }
    async logout(userId) {
        return { message: 'Successfully logged out' };
    }
    async forgotPassword(email) {
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user) {
            return {
                message: 'If that email address is in our database, we will send you an email to reset your password.'
            };
        }
        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetPasswordExpires = new Date(Date.now() + 3600000);
        await this.prisma.user.update({
            where: { id: user.id },
            data: {
                resetPasswordToken: resetToken,
                resetPasswordExpires,
            },
        });
        await this.mailService.sendPasswordReset(user.email, resetToken);
        return {
            message: 'If that email address is in our database, we will send you an email to reset your password.'
        };
    }
    async resetPassword(token, newPassword) {
        const user = await this.prisma.user.findFirst({
            where: {
                resetPasswordToken: token,
                resetPasswordExpires: { gt: new Date() },
            },
        });
        if (!user) {
            throw new common_1.BadRequestException('Password reset token is invalid or has expired.');
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
    async verifyEmail(token) {
        const user = await this.prisma.user.findFirst({
            where: {
                emailVerificationToken: token,
            },
        });
        if (!user) {
            throw new common_1.BadRequestException('Email verification token is invalid.');
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
    async getInstituteFeatures(tenantId) {
        if (!tenantId)
            return { type: 'General', features: [] };
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
            if (!institute)
                return { type: 'General', features: [] };
            const type = institute.type || 'General';
            if (!institute.subscriptions || institute.subscriptions.length === 0) {
                return { type, features: [] };
            }
            const activePlan = institute.subscriptions[0].plan;
            if (!activePlan || !activePlan.features) {
                return { type, features: [] };
            }
            return { type, features: activePlan.features };
        }
        catch (e) {
            console.error('Error fetching institute features:', e);
            return { type: 'General', features: [] };
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        prisma_master_service_1.PrismaMasterService,
        jwt_1.JwtService,
        config_1.ConfigService,
        mail_service_1.MailService])
], AuthService);
//# sourceMappingURL=auth.service.js.map
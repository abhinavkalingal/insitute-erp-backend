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
var MailService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const nodemailer = __importStar(require("nodemailer"));
let MailService = MailService_1 = class MailService {
    configService;
    transporter;
    logger = new common_1.Logger(MailService_1.name);
    constructor(configService) {
        this.configService = configService;
        const host = this.configService.get('MAIL_HOST');
        const port = this.configService.get('MAIL_PORT');
        const user = this.configService.get('MAIL_USER');
        const pass = this.configService.get('MAIL_PASSWORD');
        if (host && user && pass) {
            this.transporter = nodemailer.createTransport({
                host,
                port,
                secure: port === 465,
                auth: { user, pass }
            });
        }
        else {
            this.logger.warn('Mail configuration is missing. Using ethereal email for testing.');
            nodemailer.createTestAccount((err, account) => {
                if (err) {
                    this.logger.error('Failed to create a testing account', err);
                }
                else {
                    this.transporter = nodemailer.createTransport({
                        host: account.smtp.host,
                        port: account.smtp.port,
                        secure: account.smtp.secure,
                        auth: {
                            user: account.user,
                            pass: account.pass
                        }
                    });
                }
            });
        }
    }
    async sendMail(to, subject, html) {
        const from = this.configService.get('MAIL_FROM', 'noreply@institute.com');
        try {
            const info = await this.transporter.sendMail({
                from,
                to,
                subject,
                html
            });
            this.logger.log(`Email sent: ${info.messageId}`);
            if (info.messageId.includes('@ethereal.email')) {
                this.logger.log(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
            }
            return info;
        }
        catch (error) {
            this.logger.error(`Error sending email to ${to}`, error);
            throw error;
        }
    }
    async sendPasswordReset(to, token) {
        const resetUrl = `http://localhost:3000/auth/reset-password?token=${token}`;
        const html = `
      <h1>Password Reset Request</h1>
      <p>Click the link below to reset your password:</p>
      <a href="${resetUrl}">Reset Password</a>
    `;
        return this.sendMail(to, 'Password Reset', html);
    }
    async sendWelcomeEmail(to, name) {
        const html = `
      <h1>Welcome to the Institute ERP, ${name}!</h1>
      <p>We're excited to have you on board.</p>
    `;
        return this.sendMail(to, 'Welcome to Institute ERP', html);
    }
    async sendEmailVerification(to, token) {
        const verifyUrl = `http://localhost:3000/auth/verify-email?token=${token}`;
        const html = `
      <h1>Verify Your Email</h1>
      <p>Click the link below to verify your email address:</p>
      <a href="${verifyUrl}">Verify Email</a>
    `;
        return this.sendMail(to, 'Verify Your Email', html);
    }
};
exports.MailService = MailService;
exports.MailService = MailService = MailService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], MailService);
//# sourceMappingURL=mail.service.js.map
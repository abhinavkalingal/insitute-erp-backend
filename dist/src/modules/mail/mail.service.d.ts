import { ConfigService } from '@nestjs/config';
export declare class MailService {
    private readonly configService;
    private transporter;
    private readonly logger;
    constructor(configService: ConfigService);
    sendMail(to: string, subject: string, html: string): Promise<any>;
    sendPasswordReset(to: string, token: string): Promise<any>;
    sendWelcomeEmail(to: string, name: string): Promise<any>;
}

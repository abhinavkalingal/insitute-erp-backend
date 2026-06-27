import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;
  private readonly logger = new Logger(MailService.name);

  constructor(private readonly configService: ConfigService) {
    const host = this.configService.get<string>('MAIL_HOST');
    const port = this.configService.get<number>('MAIL_PORT');
    const user = this.configService.get<string>('MAIL_USER');
    const pass = this.configService.get<string>('MAIL_PASSWORD');

    // Create a mock transporter using ethereal if config is missing,
    // or standard transporter if config is present.
    if (host && user && pass) {
      this.transporter = nodemailer.createTransport({
        host,
        port,
        secure: port === 465,
        auth: { user, pass }});
    } else {
      this.logger.warn('Mail configuration is missing. Using ethereal email for testing.');
      nodemailer.createTestAccount((err, account) => {
        if (err) {
          this.logger.error('Failed to create a testing account', err);
        } else {
          this.transporter = nodemailer.createTransport({
            host: account.smtp.host,
            port: account.smtp.port,
            secure: account.smtp.secure,
            auth: {
              user: account.user,
              pass: account.pass}});
        }
      });
    }
  }

  async sendMail(to: string, subject: string, html: string) {
    const from = this.configService.get<string>('MAIL_FROM', 'noreply@institute.com');

    try {
      const info = await this.transporter.sendMail({
        from,
        to,
        subject,
        html});

      this.logger.log(`Email sent: ${info.messageId}`);
      if (info.messageId.includes('@ethereal.email')) {
        this.logger.log(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
      }
      return info;
    } catch (error) {
      this.logger.error(`Error sending email to ${to}`, error);
      throw error;
    }
  }

  async sendPasswordReset(to: string, token: string) {
    const resetUrl = `http://localhost:3000/auth/reset-password?token=${token}`;
    const html = `
      <h1>Password Reset Request</h1>
      <p>Click the link below to reset your password:</p>
      <a href="${resetUrl}">Reset Password</a>
    `;
    return this.sendMail(to, 'Password Reset', html);
  }

  async sendWelcomeEmail(to: string, name: string) {
    const html = `
      <h1>Welcome to the Institute ERP, ${name}!</h1>
      <p>We're excited to have you on board.</p>
    `;
    return this.sendMail(to, 'Welcome to Institute ERP', html);
  }

  async sendEmailVerification(to: string, token: string) {
    const verifyUrl = `http://localhost:3000/auth/verify-email?token=${token}`;
    const html = `
      <h1>Verify Your Email</h1>
      <p>Click the link below to verify your email address:</p>
      <a href="${verifyUrl}">Verify Email</a>
    `;
    return this.sendMail(to, 'Verify Your Email', html);
  }
}

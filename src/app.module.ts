import { envValidationSchema } from '@config/env.validation';
import { RequestContextMiddleware } from '@core/context/request-context.middleware';
import { DatabaseModule } from '@infrastructure/database/database.module';
import { AuditLogsModule } from '@modules/audit-logs/audit-logs.module';
import { AuthModule } from '@modules/auth/auth.module';
import { BranchesModule } from '@modules/branches/branches.module';
import { InstitutesModule } from '@modules/institutes/institutes.module';
import { MailModule } from '@modules/mail/mail.module';
import { NotificationsModule } from '@modules/notifications/notifications.module';
import { PermissionsModule } from '@modules/permissions/permissions.module';
import { RolesModule } from '@modules/roles/roles.module';
import { StorageModule } from '@modules/storage/storage.module';
import { UsersModule } from '@modules/users/users.module';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ServeStaticModule } from '@nestjs/serve-static';
import { LoggerModule } from 'nestjs-pino';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AcademicsModule } from './modules/academics/academics.module';
import { AttendanceModule } from './modules/attendance/attendance.module';
import { EventsModule } from './modules/events/events.module';
import { FinanceModule } from './modules/finance/finance.module';
import { ApiKeysModule } from './modules/saas/api-keys/api-keys.module';
import { BillingModule } from './modules/saas/billing/billing.module';
import { CustomDomainsModule } from './modules/saas/custom-domains/custom-domains.module';
import { FeaturesModule } from './modules/saas/features/features.module';
import { LicenseManagementModule } from './modules/saas/license-management/license-management.module';
import { PaymentGatewayModule } from './modules/saas/payment-gateway/payment-gateway.module';
import { SubscriptionsModule } from './modules/saas/subscriptions/subscriptions.module';
import { SuperAdminModule } from './modules/saas/super-admin/super-admin.module';
import { WebhooksModule } from './modules/saas/webhooks/webhooks.module';
import { WhiteLabelModule } from './modules/saas/white-label/white-label.module';
import { StaffModule } from './modules/staff/staff.module';
import { StudentsModule } from './modules/students/students.module';
import { TimetablesModule } from './modules/timetables/timetables.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import { ReportsModule } from './modules/reports/reports.module';
import { AutomationModule } from './modules/automation/automation.module';
import { SearchModule } from './modules/search/search.module';
import { DataImportExportModule } from './modules/data-import-export/data-import-export.module';
import { TelecallerModule } from './modules/telecaller/telecaller.module';
import { PlacementsModule } from './modules/placements/placements.module';
import { LeaveRequestsModule } from './modules/hr/leave-requests/leave-requests.module';
import { ReceptionModule } from './modules/reception/reception.module';
import { MarketingModule } from './modules/marketing/marketing.module';
import { OperationsModule } from './modules/operations/operations.module';
import { DirectorModule } from './modules/director/director.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { WorkshopModule } from './modules/workshop/workshop.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: envValidationSchema}),
    JwtModule.register({}), // Lightweight registration for decoding
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads'}),
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 60,
    }]),
    DatabaseModule,
    AuthModule,
    UsersModule,
    RolesModule,
    PermissionsModule,
    InstitutesModule,
    BranchesModule,
    AuditLogsModule,
    StorageModule,
    MailModule,
    NotificationsModule,
    LoggerModule.forRoot({
      pinoHttp: {
        transport:
          process.env.NODE_ENV !== 'production'
            ? { target: 'pino-pretty', options: { singleLine: true } }
            : undefined,
        autoLogging: false}}),
    StaffModule,
    StudentsModule,
    AcademicsModule,
    AttendanceModule,
    TimetablesModule,
    FinanceModule,
    EventsModule,
    SubscriptionsModule,
    FeaturesModule,
    BillingModule,
    PaymentGatewayModule,
    WhiteLabelModule,
    CustomDomainsModule,
    ApiKeysModule,
    WebhooksModule,
    LicenseManagementModule,
    SuperAdminModule,
    AnalyticsModule,
    ReportsModule,
    AutomationModule,
    SearchModule,
    DataImportExportModule,
    TelecallerModule,
    PlacementsModule,
    LeaveRequestsModule,
    ReceptionModule,
    MarketingModule,
    OperationsModule,
    DirectorModule,
    DashboardModule,
    WorkshopModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ]})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestContextMiddleware).forRoutes('*');
  }
}

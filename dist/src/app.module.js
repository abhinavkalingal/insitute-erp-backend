"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const env_validation_1 = require("./config/env.validation");
const request_context_middleware_1 = require("./core/context/request-context.middleware");
const database_module_1 = require("./infrastructure/database/database.module");
const audit_logs_module_1 = require("./modules/audit-logs/audit-logs.module");
const auth_module_1 = require("./modules/auth/auth.module");
const branches_module_1 = require("./modules/branches/branches.module");
const institutes_module_1 = require("./modules/institutes/institutes.module");
const mail_module_1 = require("./modules/mail/mail.module");
const notifications_module_1 = require("./modules/notifications/notifications.module");
const permissions_module_1 = require("./modules/permissions/permissions.module");
const roles_module_1 = require("./modules/roles/roles.module");
const storage_module_1 = require("./modules/storage/storage.module");
const users_module_1 = require("./modules/users/users.module");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const serve_static_1 = require("@nestjs/serve-static");
const nestjs_pino_1 = require("nestjs-pino");
const throttler_1 = require("@nestjs/throttler");
const core_1 = require("@nestjs/core");
const path_1 = require("path");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const academics_module_1 = require("./modules/academics/academics.module");
const attendance_module_1 = require("./modules/attendance/attendance.module");
const events_module_1 = require("./modules/events/events.module");
const finance_module_1 = require("./modules/finance/finance.module");
const api_keys_module_1 = require("./modules/saas/api-keys/api-keys.module");
const billing_module_1 = require("./modules/saas/billing/billing.module");
const custom_domains_module_1 = require("./modules/saas/custom-domains/custom-domains.module");
const features_module_1 = require("./modules/saas/features/features.module");
const license_management_module_1 = require("./modules/saas/license-management/license-management.module");
const payment_gateway_module_1 = require("./modules/saas/payment-gateway/payment-gateway.module");
const subscriptions_module_1 = require("./modules/saas/subscriptions/subscriptions.module");
const super_admin_module_1 = require("./modules/saas/super-admin/super-admin.module");
const webhooks_module_1 = require("./modules/saas/webhooks/webhooks.module");
const white_label_module_1 = require("./modules/saas/white-label/white-label.module");
const staff_module_1 = require("./modules/staff/staff.module");
const students_module_1 = require("./modules/students/students.module");
const timetables_module_1 = require("./modules/timetables/timetables.module");
const analytics_module_1 = require("./modules/analytics/analytics.module");
const reports_module_1 = require("./modules/reports/reports.module");
const automation_module_1 = require("./modules/automation/automation.module");
const search_module_1 = require("./modules/search/search.module");
const data_import_export_module_1 = require("./modules/data-import-export/data-import-export.module");
const telecaller_module_1 = require("./modules/telecaller/telecaller.module");
const placements_module_1 = require("./modules/placements/placements.module");
const leave_requests_module_1 = require("./modules/hr/leave-requests/leave-requests.module");
const reception_module_1 = require("./modules/reception/reception.module");
const marketing_module_1 = require("./modules/marketing/marketing.module");
const operations_module_1 = require("./modules/operations/operations.module");
const director_module_1 = require("./modules/director/director.module");
const dashboard_module_1 = require("./modules/dashboard/dashboard.module");
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(request_context_middleware_1.RequestContextMiddleware).forRoutes('*');
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                validationSchema: env_validation_1.envValidationSchema
            }),
            jwt_1.JwtModule.register({}),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'uploads'),
                serveRoot: '/uploads'
            }),
            throttler_1.ThrottlerModule.forRoot([{
                    ttl: 60000,
                    limit: 60,
                }]),
            database_module_1.DatabaseModule,
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            roles_module_1.RolesModule,
            permissions_module_1.PermissionsModule,
            institutes_module_1.InstitutesModule,
            branches_module_1.BranchesModule,
            audit_logs_module_1.AuditLogsModule,
            storage_module_1.StorageModule,
            mail_module_1.MailModule,
            notifications_module_1.NotificationsModule,
            nestjs_pino_1.LoggerModule.forRoot({
                pinoHttp: {
                    transport: process.env.NODE_ENV !== 'production'
                        ? { target: 'pino-pretty', options: { singleLine: true } }
                        : undefined,
                    autoLogging: false
                }
            }),
            staff_module_1.StaffModule,
            students_module_1.StudentsModule,
            academics_module_1.AcademicsModule,
            attendance_module_1.AttendanceModule,
            timetables_module_1.TimetablesModule,
            finance_module_1.FinanceModule,
            events_module_1.EventsModule,
            subscriptions_module_1.SubscriptionsModule,
            features_module_1.FeaturesModule,
            billing_module_1.BillingModule,
            payment_gateway_module_1.PaymentGatewayModule,
            white_label_module_1.WhiteLabelModule,
            custom_domains_module_1.CustomDomainsModule,
            api_keys_module_1.ApiKeysModule,
            webhooks_module_1.WebhooksModule,
            license_management_module_1.LicenseManagementModule,
            super_admin_module_1.SuperAdminModule,
            analytics_module_1.AnalyticsModule,
            reports_module_1.ReportsModule,
            automation_module_1.AutomationModule,
            search_module_1.SearchModule,
            data_import_export_module_1.DataImportExportModule,
            telecaller_module_1.TelecallerModule,
            placements_module_1.PlacementsModule,
            leave_requests_module_1.LeaveRequestsModule,
            reception_module_1.ReceptionModule,
            marketing_module_1.MarketingModule,
            operations_module_1.OperationsModule,
            director_module_1.DirectorModule,
            dashboard_module_1.DashboardModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            {
                provide: core_1.APP_GUARD,
                useClass: throttler_1.ThrottlerGuard,
            },
        ]
    })
], AppModule);
//# sourceMappingURL=app.module.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaTenantService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const pg_1 = require("pg");
const adapter_pg_1 = require("@prisma/adapter-pg");
const request_context_1 = require("../../core/context/request.context");
let PrismaTenantService = class PrismaTenantService {
    clients = new Map();
    getClient(databaseUrl) {
        if (!databaseUrl) {
            throw new Error('Database URL must be provided to tenant service');
        }
        if (this.clients.has(databaseUrl)) {
            return this.clients.get(databaseUrl);
        }
        const pool = new pg_1.Pool({ connectionString: databaseUrl });
        const adapter = new adapter_pg_1.PrismaPg(pool);
        const client = new client_1.PrismaClient({ adapter });
        const extendedClient = client.$extends({
            query: {
                $allModels: {
                    async $allOperations({ model, operation, args, query }) {
                        const result = await query(args);
                        const actionsToLog = ['create', 'update', 'delete'];
                        if (actionsToLog.includes(operation) && model !== 'AuditLog') {
                            const entityId = result?.id;
                            if (entityId) {
                                const context = request_context_1.requestContext.getStore();
                                extendedClient.auditLog.create({
                                    data: {
                                        userId: context?.userId || null,
                                        action: operation.toUpperCase(),
                                        entity: model,
                                        entityId,
                                        changes: args?.data ? JSON.parse(JSON.stringify(args.data)) : null,
                                        ipAddress: context?.ipAddress || null,
                                        userAgent: context?.userAgent || null
                                    }
                                }).catch(console.error);
                            }
                        }
                        return result;
                    }
                }
            }
        });
        this.clients.set(databaseUrl, extendedClient);
        return extendedClient;
    }
    async onModuleDestroy() {
        const disconnectPromises = Array.from(this.clients.values()).map(client => client.$disconnect());
        await Promise.all(disconnectPromises);
        this.clients.clear();
    }
};
exports.PrismaTenantService = PrismaTenantService;
exports.PrismaTenantService = PrismaTenantService = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.TRANSIENT })
], PrismaTenantService);
//# sourceMappingURL=prisma-tenant.service.js.map
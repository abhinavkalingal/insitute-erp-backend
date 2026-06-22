import { AuditLogsService } from './audit-logs.service';
import { AuditLogQueryDto } from './dto/audit-log-query.dto';
export declare class AuditLogsController {
    private readonly auditLogsService;
    constructor(auditLogsService: AuditLogsService);
    findActivityLogs(query: AuditLogQueryDto): Promise<({
        user: {
            email: string;
            firstName: string;
            lastName: string | null;
        } | null;
    } & {
        id: string;
        action: string;
        createdAt: Date;
        userId: string | null;
        type: string;
        entity: string | null;
        entityId: string | null;
        changes: import("@prisma/client/runtime/client").JsonValue | null;
        ipAddress: string | null;
        userAgent: string | null;
    })[]>;
    findLoginHistory(query: AuditLogQueryDto): Promise<({
        user: {
            email: string;
            firstName: string;
            lastName: string | null;
        } | null;
    } & {
        id: string;
        action: string;
        createdAt: Date;
        userId: string | null;
        type: string;
        entity: string | null;
        entityId: string | null;
        changes: import("@prisma/client/runtime/client").JsonValue | null;
        ipAddress: string | null;
        userAgent: string | null;
    })[]>;
    findDataChanges(query: AuditLogQueryDto): Promise<({
        user: {
            email: string;
            firstName: string;
            lastName: string | null;
        } | null;
    } & {
        id: string;
        action: string;
        createdAt: Date;
        userId: string | null;
        type: string;
        entity: string | null;
        entityId: string | null;
        changes: import("@prisma/client/runtime/client").JsonValue | null;
        ipAddress: string | null;
        userAgent: string | null;
    })[]>;
    findSecurityEvents(query: AuditLogQueryDto): Promise<({
        user: {
            email: string;
            firstName: string;
            lastName: string | null;
        } | null;
    } & {
        id: string;
        action: string;
        createdAt: Date;
        userId: string | null;
        type: string;
        entity: string | null;
        entityId: string | null;
        changes: import("@prisma/client/runtime/client").JsonValue | null;
        ipAddress: string | null;
        userAgent: string | null;
    })[]>;
    findByEntity(entity: string, entityId: string): Promise<({
        user: {
            email: string;
            firstName: string;
            lastName: string | null;
        } | null;
    } & {
        id: string;
        action: string;
        createdAt: Date;
        userId: string | null;
        type: string;
        entity: string | null;
        entityId: string | null;
        changes: import("@prisma/client/runtime/client").JsonValue | null;
        ipAddress: string | null;
        userAgent: string | null;
    })[]>;
}

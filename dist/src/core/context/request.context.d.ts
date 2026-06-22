import { AsyncLocalStorage } from 'async_hooks';
export interface RequestContextData {
    userId?: string;
    ipAddress?: string;
    userAgent?: string;
    tenantId?: string;
    tenantDbUrl?: string;
}
export declare const requestContext: AsyncLocalStorage<RequestContextData>;

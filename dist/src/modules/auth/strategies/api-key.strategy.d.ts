import { Strategy } from 'passport-custom';
import { ApiKeysService } from '../../saas/api-keys/services/api-keys/api-keys.service';
declare const ApiKeyStrategy_base: new () => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class ApiKeyStrategy extends ApiKeyStrategy_base {
    private readonly apiKeysService;
    constructor(apiKeysService: ApiKeysService);
    validate(req: Request): Promise<any>;
}
export {};

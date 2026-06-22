import { NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaMasterService } from '../../infrastructure/database/prisma-master.service';
export declare class RequestContextMiddleware implements NestMiddleware {
    private readonly jwtService;
    private readonly masterDb;
    constructor(jwtService: JwtService, masterDb: PrismaMasterService);
    use(req: any, res: any, next: () => void): Promise<void>;
}

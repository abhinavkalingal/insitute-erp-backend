"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaMasterService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma-master/client");
const pg_1 = require("pg");
const adapter_pg_1 = require("@prisma/adapter-pg");
let PrismaMasterService = class PrismaMasterService extends client_1.PrismaClient {
    constructor() {
        const pool = new pg_1.Pool({ connectionString: process.env.MASTER_DATABASE_URL });
        const adapter = new adapter_pg_1.PrismaPg(pool);
        super({ adapter });
    }
};
exports.PrismaMasterService = PrismaMasterService;
exports.PrismaMasterService = PrismaMasterService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], PrismaMasterService);
//# sourceMappingURL=prisma-master.service.js.map
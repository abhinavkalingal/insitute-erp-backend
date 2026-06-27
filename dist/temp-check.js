"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
process.env.DATABASE_URL = 'postgresql://postgres:abhi9072@localhost:5432/erp_master?schema=tenant_globaltech';
const prisma = new client_1.PrismaClient();
prisma.user.findMany().then(u => { console.log('USERS:', u); process.exit(0); }).catch(e => { console.error(e); process.exit(1); });
//# sourceMappingURL=temp-check.js.map
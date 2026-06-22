"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const bcrypt = __importStar(require("bcrypt"));
require("dotenv/config");
async function main() {
    console.log('Seeding Master DB...');
    const connectionString = process.env.MASTER_DATABASE_URL || 'postgresql://postgres:abhi9072@localhost:5432/erp_master';
    const client = new pg_1.Client({ connectionString });
    await client.connect();
    const email = 'admin@institute.com';
    const passwordHash = await bcrypt.hash('admin123', 10);
    const firstName = 'System';
    const lastName = 'Admin';
    try {
        const res = await client.query('SELECT * FROM "SuperAdmin" WHERE email = $1', [email]);
        if (res.rows.length === 0) {
            const uuid = '7b8b209e-7119-482a-bc91-382902377ee1';
            await client.query('INSERT INTO "SuperAdmin" (id, email, "passwordHash", "firstName", "lastName", "isActive", "createdAt", "updatedAt") VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW())', [uuid, email, passwordHash, firstName, lastName, true]);
            console.log('Super Admin user created successfully in Master DB!');
        }
        else {
            console.log('Super Admin user already exists in Master DB.');
        }
    }
    catch (err) {
        console.error('Error seeding Master DB:', err);
    }
    finally {
        await client.end();
    }
}
main().catch(console.error);
//# sourceMappingURL=seed_master.js.map
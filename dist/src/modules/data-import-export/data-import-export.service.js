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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var DataImportExportService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataImportExportService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../infrastructure/database/prisma.service");
const stream_1 = require("stream");
const csvParser = require("csv-parser");
const json2csv_1 = require("json2csv");
const bcrypt = __importStar(require("bcrypt"));
let DataImportExportService = DataImportExportService_1 = class DataImportExportService {
    prisma;
    logger = new common_1.Logger(DataImportExportService_1.name);
    constructor(prisma) {
        this.prisma = prisma;
    }
    generateStudentTemplate() {
        const fields = ['firstName', 'lastName', 'email', 'enrollmentNumber'];
        const json2csvParser = new json2csv_1.Parser({ fields });
        return json2csvParser.parse([]);
    }
    async importStudents(fileBuffer) {
        const results = [];
        const errors = [];
        let rowIndex = 1;
        await new Promise((resolve, reject) => {
            const stream = stream_1.Readable.from(fileBuffer);
            stream
                .pipe(csvParser())
                .on('data', (data) => {
                rowIndex++;
                results.push({ row: rowIndex, data });
            })
                .on('end', resolve)
                .on('error', reject);
        });
        const successLogs = [];
        const errorLogs = [];
        for (const item of results) {
            try {
                const { firstName, lastName, email, enrollmentNumber } = item.data;
                if (!firstName || !lastName || !email) {
                    throw new Error('Missing required fields: firstName, lastName, email');
                }
                const existingUser = await this.prisma.user.findUnique({
                    where: { email }
                });
                if (existingUser) {
                    throw new Error(`Email ${email} is already in use`);
                }
                const passwordHash = await bcrypt.hash('Password123!', 10);
                await this.prisma.$transaction(async (prisma) => {
                    const user = await prisma.user.create({
                        data: {
                            email,
                            passwordHash,
                            firstName,
                            lastName,
                            isActive: true,
                            isEmailVerified: false
                        }
                    });
                    await prisma.student.create({
                        data: {
                            userId: user.id,
                            enrollmentNo: enrollmentNumber || null
                        }
                    });
                });
                successLogs.push({ row: item.row, message: `Successfully imported ${email}` });
            }
            catch (error) {
                this.logger.warn(`Failed to import row ${item.row}: ${error.message}`);
                errorLogs.push({ row: item.row, error: error.message });
            }
        }
        return {
            totalProcessed: results.length,
            successCount: successLogs.length,
            errorCount: errorLogs.length,
            successLogs,
            errorLogs
        };
    }
};
exports.DataImportExportService = DataImportExportService;
exports.DataImportExportService = DataImportExportService = DataImportExportService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DataImportExportService);
//# sourceMappingURL=data-import-export.service.js.map
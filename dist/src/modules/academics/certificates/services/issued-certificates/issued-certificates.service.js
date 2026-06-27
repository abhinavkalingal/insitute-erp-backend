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
Object.defineProperty(exports, "__esModule", { value: true });
exports.IssuedCertificatesService = void 0;
const page_dto_1 = require("../../../../../core/utils/pagination/page.dto");
const page_meta_dto_1 = require("../../../../../core/utils/pagination/page-meta.dto");
const prisma_service_1 = require("../../../../../infrastructure/database/prisma.service");
const common_1 = require("@nestjs/common");
const crypto = __importStar(require("crypto"));
let IssuedCertificatesService = class IssuedCertificatesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    generateCertificateNumber() {
        const randomHex = crypto.randomBytes(4).toString('hex').toUpperCase();
        const year = new Date().getFullYear();
        return `CERT-${year}-${randomHex}`;
    }
    async issue(issueDto) {
        const template = await this.prisma.certificateTemplate.findUnique({
            where: { id: issueDto.templateId }
        });
        if (!template) {
            throw new common_1.NotFoundException('Certificate template not found');
        }
        const student = await this.prisma.student.findUnique({
            where: { id: issueDto.studentId },
            include: { user: true }
        });
        if (!student) {
            throw new common_1.NotFoundException('Student not found');
        }
        const existing = await this.prisma.issuedCertificate.findUnique({
            where: {
                templateId_studentId: {
                    templateId: issueDto.templateId,
                    studentId: issueDto.studentId
                }
            }
        });
        if (existing) {
            throw new common_1.ConflictException('This certificate template has already been issued to this student.');
        }
        const certificateNumber = this.generateCertificateNumber();
        const issueDate = new Date();
        const issuedCert = await this.prisma.issuedCertificate.create({
            data: {
                templateId: issueDto.templateId,
                studentId: issueDto.studentId,
                certificateNumber,
                issueDate
            }
        });
        const studentName = `${student.user.firstName} ${student.user.lastName}`.trim();
        let renderedHtml = template.contentHtml;
        renderedHtml = renderedHtml.replace(/\{\{studentName\}\}/g, studentName);
        renderedHtml = renderedHtml.replace(/\{\{studentEmail\}\}/g, student.user.email);
        renderedHtml = renderedHtml.replace(/\{\{issueDate\}\}/g, issueDate.toLocaleDateString());
        renderedHtml = renderedHtml.replace(/\{\{certificateNumber\}\}/g, certificateNumber);
        return {
            certificate: issuedCert,
            renderedHtml,
            backgroundUrl: template.backgroundUrl
        };
    }
    async findAll(queryOptions) {
        const where = {};
        if (queryOptions.templateId)
            where.templateId = queryOptions.templateId;
        if (queryOptions.studentId)
            where.studentId = queryOptions.studentId;
        const itemCount = await this.prisma.issuedCertificate.count({ where });
        const certs = await this.prisma.issuedCertificate.findMany({
            where,
            orderBy: { issueDate: queryOptions.order },
            skip: queryOptions.skip,
            take: queryOptions.take,
            include: {
                template: { select: { name: true } },
                student: { include: { user: { select: { firstName: true, lastName: true } } } }
            }
        });
        const pageMetaDto = new page_meta_dto_1.PageMetaDto({ itemCount, pageOptionsDto: queryOptions });
        return new page_dto_1.PageDto(certs, pageMetaDto);
    }
    async verifyQrCode(certificateNumber) {
        const cert = await this.prisma.issuedCertificate.findUnique({
            where: { certificateNumber },
            include: {
                template: { select: { name: true } },
                student: {
                    include: {
                        user: { select: { firstName: true, lastName: true } },
                        branch: { select: { name: true } },
                    },
                },
            },
        });
        if (!cert) {
            throw new common_1.NotFoundException('Invalid Certificate Number. This certificate does not exist in our records.');
        }
        return {
            isValid: true,
            issuedBy: cert.student?.branch?.name || 'Institute',
            awardedTo: `${cert.student.user.firstName} ${cert.student.user.lastName}`,
            certificateName: cert.template?.name || 'Certificate',
            issueDate: cert.issueDate,
            certificateNumber: cert.certificateNumber
        };
    }
};
exports.IssuedCertificatesService = IssuedCertificatesService;
exports.IssuedCertificatesService = IssuedCertificatesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], IssuedCertificatesService);
//# sourceMappingURL=issued-certificates.service.js.map
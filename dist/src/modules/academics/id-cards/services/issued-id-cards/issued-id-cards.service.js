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
exports.IssuedIdCardsService = void 0;
const page_dto_1 = require("../../../../../core/utils/pagination/page.dto");
const page_meta_dto_1 = require("../../../../../core/utils/pagination/page-meta.dto");
const prisma_service_1 = require("../../../../../infrastructure/database/prisma.service");
const common_1 = require("@nestjs/common");
const crypto = __importStar(require("crypto"));
let IssuedIdCardsService = class IssuedIdCardsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    generateCardNumber() {
        const randomHex = crypto.randomBytes(4).toString('hex').toUpperCase();
        const year = new Date().getFullYear();
        return `IDC-${year}-${randomHex}`;
    }
    async issue(issueDto) {
        const template = await this.prisma.idCardTemplate.findUnique({
            where: { id: issueDto.templateId }
        });
        if (!template) {
            throw new common_1.NotFoundException('ID Card template not found');
        }
        let finalHolderName = issueDto.holderName || '';
        if (template.roleType === 'STUDENT') {
            if (!issueDto.studentId)
                throw new common_1.BadRequestException('studentId is required for STUDENT ID Cards');
            const student = await this.prisma.student.findUnique({
                where: { id: issueDto.studentId },
                include: { user: true }
            });
            if (!student)
                throw new common_1.NotFoundException('Student not found');
            finalHolderName = `${student.user.firstName} ${student.user.lastName}`.trim();
        }
        else if (template.roleType === 'STAFF') {
            if (!issueDto.staffId)
                throw new common_1.BadRequestException('staffId is required for STAFF ID Cards');
            const staff = await this.prisma.staff.findUnique({
                where: { id: issueDto.staffId },
                include: { user: true }
            });
            if (!staff)
                throw new common_1.NotFoundException('Staff not found');
            finalHolderName = `${staff.user.firstName} ${staff.user.lastName}`.trim();
        }
        else if (template.roleType === 'TEMPORARY') {
            if (!issueDto.holderName)
                throw new common_1.BadRequestException('holderName is required for TEMPORARY ID Cards');
            if (!issueDto.validUntil)
                throw new common_1.BadRequestException('validUntil is required for TEMPORARY ID Cards');
        }
        const cardNumber = this.generateCardNumber();
        const issueDate = new Date();
        const issuedCard = await this.prisma.issuedIdCard.create({
            data: {
                templateId: issueDto.templateId,
                studentId: issueDto.studentId,
                staffId: issueDto.staffId,
                holderName: finalHolderName,
                cardNumber,
                barcodeData: issueDto.barcodeData || cardNumber,
                issueDate,
                validUntil: issueDto.validUntil ? new Date(issueDto.validUntil) : null
            }
        });
        let renderedHtml = template.contentHtml;
        renderedHtml = renderedHtml.replace(/\{\{holderName\}\}/g, finalHolderName);
        renderedHtml = renderedHtml.replace(/\{\{cardNumber\}\}/g, cardNumber);
        renderedHtml = renderedHtml.replace(/\{\{barcodeData\}\}/g, issuedCard.barcodeData || '');
        renderedHtml = renderedHtml.replace(/\{\{issueDate\}\}/g, issueDate.toLocaleDateString());
        if (issuedCard.validUntil) {
            renderedHtml = renderedHtml.replace(/\{\{validUntil\}\}/g, issuedCard.validUntil.toLocaleDateString());
        }
        return {
            card: issuedCard,
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
        if (queryOptions.staffId)
            where.staffId = queryOptions.staffId;
        const itemCount = await this.prisma.issuedIdCard.count({ where });
        const cards = await this.prisma.issuedIdCard.findMany({
            where,
            orderBy: { issueDate: queryOptions.order },
            skip: queryOptions.skip,
            take: queryOptions.take,
            include: {
                template: { select: { name: true, roleType: true } }
            }
        });
        const pageMetaDto = new page_meta_dto_1.PageMetaDto({ itemCount, pageOptionsDto: queryOptions });
        return new page_dto_1.PageDto(cards, pageMetaDto);
    }
    async revokeCard(id) {
        const card = await this.prisma.issuedIdCard.findFirst({
            where: { id }
        });
        if (!card)
            throw new common_1.NotFoundException('Issued ID Card not found');
        return this.prisma.issuedIdCard.update({
            where: { id },
            data: { isActive: false }
        });
    }
    async verifyCard(cardNumber) {
        const card = await this.prisma.issuedIdCard.findUnique({
            where: { cardNumber },
            include: {
                template: { select: { name: true, roleType: true } }
            }
        });
        if (!card) {
            throw new common_1.NotFoundException('Invalid ID Card Number.');
        }
        const now = new Date();
        const isExpired = card.validUntil ? now > card.validUntil : false;
        const isValid = card.isActive && !isExpired;
        return {
            isValid,
            status: !card.isActive ? 'REVOKED' : isExpired ? 'EXPIRED' : 'ACTIVE',
            issuedBy: 'Institute',
            holderName: card.holderName,
            roleType: card.template?.roleType || 'Student',
            issueDate: card.issueDate,
            validUntil: card.validUntil,
            cardNumber: card.cardNumber
        };
    }
};
exports.IssuedIdCardsService = IssuedIdCardsService;
exports.IssuedIdCardsService = IssuedIdCardsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], IssuedIdCardsService);
//# sourceMappingURL=issued-id-cards.service.js.map
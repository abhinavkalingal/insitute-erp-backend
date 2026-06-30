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
exports.FormsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../infrastructure/database/prisma.service");
let FormsService = class FormsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createForm(data) {
        return this.prisma.customForm.create({ data });
    }
    async getForms() {
        return this.prisma.customForm.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                _count: {
                    select: { submissions: true },
                },
            },
        });
    }
    async getFormById(id) {
        const form = await this.prisma.customForm.findUnique({ where: { id } });
        if (!form)
            throw new common_1.NotFoundException('Form not found');
        return form;
    }
    async updateForm(id, data) {
        return this.prisma.customForm.update({
            where: { id },
            data,
        });
    }
    async deleteForm(id) {
        return this.prisma.customForm.delete({
            where: { id },
        });
    }
    async submitForm(formId, data) {
        await this.getFormById(formId);
        return this.prisma.formSubmission.create({
            data: {
                ...data,
                form: { connect: { id: formId } },
            },
        });
    }
    async getSubmissions(formId) {
        return this.prisma.formSubmission.findMany({
            where: { formId },
            orderBy: { createdAt: 'desc' },
        });
    }
};
exports.FormsService = FormsService;
exports.FormsService = FormsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FormsService);
//# sourceMappingURL=forms.service.js.map
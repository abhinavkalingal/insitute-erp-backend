import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@infrastructure/database/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class FormsService {
  constructor(private prisma: PrismaService) {}

  async createForm(data: Prisma.CustomFormCreateInput) {
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

  async getFormById(id: string) {
    const form = await this.prisma.customForm.findUnique({ where: { id } });
    if (!form) throw new NotFoundException('Form not found');
    return form;
  }

  async updateForm(id: string, data: Prisma.CustomFormUpdateInput) {
    return this.prisma.customForm.update({
      where: { id },
      data,
    });
  }

  async deleteForm(id: string) {
    return this.prisma.customForm.delete({
      where: { id },
    });
  }

  async submitForm(formId: string, data: Prisma.FormSubmissionCreateInput) {
    // Ensure form exists
    await this.getFormById(formId);
    return this.prisma.formSubmission.create({
      data: {
        ...data,
        form: { connect: { id: formId } },
      },
    });
  }

  async getSubmissions(formId: string) {
    return this.prisma.formSubmission.findMany({
      where: { formId },
      orderBy: { createdAt: 'desc' },
    });
  }
}

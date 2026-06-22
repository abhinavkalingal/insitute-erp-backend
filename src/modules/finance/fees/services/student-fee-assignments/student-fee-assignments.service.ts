import { PageDto } from '@core/utils/pagination/page.dto';
import { PageMetaDto } from '@core/utils/pagination/page-meta.dto';
import { PrismaService } from '@infrastructure/database/prisma.service';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

import { AssignFeeDto, StudentFeeAssignmentQueryOptionsDto } from '../../dto/assign-fee.dto';

@Injectable()
export class StudentFeeAssignmentsService {
  constructor(private readonly prisma: PrismaService) {}

  async assignFee( assignDto: AssignFeeDto) {
    // 1. Verify Student
    const student = await this.prisma.student.findUnique({
      where: { id: assignDto.studentId }});
    if (!student ) {
      throw new NotFoundException('Student not found');
    }

    // 2. Verify Fee Structure
    const feeStructure = await this.prisma.feeStructure.findUnique({
      where: { id: assignDto.feeStructureId },
      include: { category: true }});
    if (!feeStructure ) {
      throw new NotFoundException('Fee Structure not found');
    }

    let discountAmount = 0;

    // 3. Verify Discount if provided
    if (assignDto.discountId) {
      const discount = await this.prisma.feeDiscount.findUnique({
        where: { id: assignDto.discountId }});

      if (!discount ) {
        throw new NotFoundException('Fee Discount not found');
      }

      if (discount.type === 'PERCENTAGE') {
        discountAmount = feeStructure.amount * (discount.value / 100);
      } else {
        discountAmount = discount.value;
      }
    }

    const netAmount = Math.max(0, feeStructure.amount - discountAmount);

    // 4. Create Invoice and InvoiceItem transactionally
    const invoiceNumber = `INV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    return this.prisma.$transaction(async (prisma) => {
      const invoice = await prisma.invoice.create({
        data: {
          
          studentId: assignDto.studentId,
          invoiceNumber,
          issueDate: new Date(),
          dueDate: assignDto.dueDate ? new Date(assignDto.dueDate) : new Date(),
          status: 'PENDING',
          totalAmount: netAmount,
          discountId: assignDto.discountId,
          discount: discountAmount,
          items: {
            create: {
              feeStructureId: feeStructure.id,
              description: feeStructure.name,
              amount: feeStructure.amount}}},
        include: {
          items: true}});

      return invoice;
    });
  }

  async findAll( queryOptions: StudentFeeAssignmentQueryOptionsDto) {
    const where: Prisma.InvoiceWhereInput = {
      
    };

    if (queryOptions.studentId) {
      where.studentId = queryOptions.studentId;
    }

    if (queryOptions.status) {
      where.status = queryOptions.status;
    }

    if (queryOptions.feeStructureId) {
      where.items = {
        some: { feeStructureId: queryOptions.feeStructureId }};
    }

    const itemCount = await this.prisma.invoice.count({ where });

    const invoices = await this.prisma.invoice.findMany({
      where,
      orderBy: { createdAt: queryOptions.order },
      skip: queryOptions.skip,
      take: queryOptions.take,
      include: {
        student: { include: { user: { select: { firstName: true, lastName: true } } } },
        items: true,
        feeDiscount: { select: { name: true, type: true, value: true } }}});

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto: queryOptions });
    return new PageDto(invoices, pageMetaDto);
  }

  async findOne(id: string, ) {
    const invoice = await this.prisma.invoice.findFirst({
      where: { id},
      include: {
        student: { include: { user: { select: { firstName: true, lastName: true } } } },
        items: { include: { feeStructure: { select: { name: true } } } },
        feeDiscount: true,
        payments: true}});

    if (!invoice) {
      throw new NotFoundException('Fee Assignment / Invoice not found');
    }

    return invoice;
  }
}

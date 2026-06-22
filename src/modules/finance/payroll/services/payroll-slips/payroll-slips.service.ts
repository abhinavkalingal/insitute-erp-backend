import { PageDto } from '@core/utils/pagination/page.dto';
import { PageMetaDto } from '@core/utils/pagination/page-meta.dto';
import { PrismaService } from '@infrastructure/database/prisma.service';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException} from '@nestjs/common';
import { Prisma } from '@prisma/client';

import {
  GeneratePayrollSlipDto,
  PayPayrollSlipDto,
  PayrollSlipQueryOptionsDto} from '../../dto/payroll-slip.dto';

@Injectable()
export class PayrollSlipsService {
  constructor(private readonly prisma: PrismaService) {}

  async generate( generateDto: GeneratePayrollSlipDto) {
    const { staffId, month, year } = generateDto;

    // 1. Verify a slip hasn't already been generated for this month/year
    const existingSlip = await this.prisma.payrollSlip.findUnique({
      where: {
        staffId_month_year: { staffId, month, year }}});

    if (existingSlip) {
      throw new ConflictException(
        `A payroll slip for ${month}/${year} already exists for this staff member`,
      );
    }

    // 2. Fetch the Salary Structure
    const structure = await this.prisma.salaryStructure.findUnique({
      where: { staffId }});

    if (!structure ) {
      throw new NotFoundException('Salary Structure not defined for this staff member');
    }

    // 3. Process Loans/Advances
    // Fetch all active loans for this staff member
    const activeLoans = await this.prisma.staffLoan.findMany({
      where: {
        staffId,
        
        status: 'ACTIVE'}});

    let totalLoanDeduction = 0;

    // Calculate total loan deduction
    for (const loan of activeLoans) {
      // Deduct the predefined per-month amount, but don't exceed the remaining balance
      const deduction = Math.min(loan.deductionPerMonth, loan.remainingAmount);
      totalLoanDeduction += deduction;
    }

    // Calculate final Net Pay
    const netPay = Math.max(0, structure.netSalary - totalLoanDeduction);

    // 4. Create the Slip Snapshot
    return this.prisma.payrollSlip.create({
      data: {
        
        staffId,
        month,
        year,
        basicPay: structure.basicPay,
        allowances: structure.allowances ?? Prisma.JsonNull,
        deductions: structure.deductions ?? Prisma.JsonNull,
        loanDeduction: totalLoanDeduction,
        netPay,
        status: 'GENERATED'}});
  }

  async paySlip(id: string,  payDto: PayPayrollSlipDto) {
    return this.prisma.$transaction(async (prisma) => {
      const slip = await prisma.payrollSlip.findUnique({
        where: { id }});

      if (!slip ) {
        throw new NotFoundException('Payroll slip not found');
      }

      if (slip.status === 'PAID') {
        throw new ConflictException('Payroll slip is already paid');
      }

      // If the slip had a loan deduction, we need to apply that deduction to the staff's active loans
      if (slip.loanDeduction > 0) {
        const activeLoans = await prisma.staffLoan.findMany({
          where: {
            staffId: slip.staffId,
            status: 'ACTIVE'},
          orderBy: { issueDate: 'asc' }, // Oldest loans first
        });

        let remainingDeductionToApply = slip.loanDeduction;

        for (const loan of activeLoans) {
          if (remainingDeductionToApply <= 0) break;

          const deductionForThisLoan = Math.min(loan.remainingAmount, remainingDeductionToApply);
          const newRemaining = loan.remainingAmount - deductionForThisLoan;

          await prisma.staffLoan.update({
            where: { id: loan.id },
            data: {
              remainingAmount: newRemaining,
              status: newRemaining <= 0 ? 'PAID_OFF' : 'ACTIVE'}});

          remainingDeductionToApply -= deductionForThisLoan;
        }
      }

      // Mark the slip as paid
      return prisma.payrollSlip.update({
        where: { id },
        data: {
          status: 'PAID',
          paymentDate: new Date(payDto.paymentDate),
          paymentMethod: payDto.paymentMethod,
          reference: payDto.reference}});
    });
  }

  async findAll( queryOptions: PayrollSlipQueryOptionsDto) {
    const where: Prisma.PayrollSlipWhereInput = {
      
    };

    if (queryOptions.staffId) {
      where.staffId = queryOptions.staffId;
    }

    if (queryOptions.month) {
      where.month = queryOptions.month;
    }

    if (queryOptions.year) {
      where.year = queryOptions.year;
    }

    if (queryOptions.status) {
      where.status = queryOptions.status;
    }

    const itemCount = await this.prisma.payrollSlip.count({ where });

    const slips = await this.prisma.payrollSlip.findMany({
      where,
      orderBy: { createdAt: queryOptions.order },
      skip: queryOptions.skip,
      take: queryOptions.take,
      include: {
        staff: { include: { user: { select: { firstName: true, lastName: true } } } }}});

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto: queryOptions });
    return new PageDto(slips, pageMetaDto);
  }

  async findOne(id: string, ) {
    const slip = await this.prisma.payrollSlip.findFirst({
      where: { id},
      include: {
        staff: { include: { user: { select: { firstName: true, lastName: true } } } }}});

    if (!slip) {
      throw new NotFoundException('Payroll slip not found');
    }

    return slip;
  }
}

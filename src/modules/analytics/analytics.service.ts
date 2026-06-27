import { Injectable } from '@nestjs/common';
import { PrismaService } from '@infrastructure/database/prisma.service';
import { AnalyticsQueryDto } from './dto/analytics-query.dto';

@Injectable()
export class AnalyticsService {
  constructor(private readonly prisma: PrismaService) {}

  private buildWhereClause( query: AnalyticsQueryDto) {
    const where: any = { };
    if (query.branchId) {
      where.branchId = query.branchId;
    }
    if (query.startDate || query.endDate) {
      where.createdAt = {};
      if (query.startDate) where.createdAt.gte = new Date(query.startDate);
      if (query.endDate) where.createdAt.lte = new Date(query.endDate);
    }
    return where;
  }

  async getDashboardOverview( query: AnalyticsQueryDto) {
    const where = this.buildWhereClause( query);

    const [totalStudents, totalStaff, totalCourses, invoices] = await Promise.all([
      this.prisma.student.count({ where }),
      this.prisma.staff.count({ where }),
      this.prisma.course.count({ where: {  isActive: true } }),
      this.prisma.invoice.aggregate({
        where: this.buildWhereClause( query),
        _sum: {
          totalAmount: true,
          paidAmount: true}}),
    ]);

    const totalRevenue = invoices._sum.paidAmount || 0;
    const pendingRevenue = (invoices._sum.totalAmount || 0) - totalRevenue;

    return {
      totalStudents,
      totalStaff,
      totalCourses,
      financials: {
        totalRevenue,
        pendingRevenue}};
  }

  async getStudentAnalytics( query: AnalyticsQueryDto) {
    const where = this.buildWhereClause( query);

    const [total, active, alumni, dropped] = await Promise.all([
      this.prisma.student.count({ where }),
      this.prisma.student.count({ where: { ...where, status: 'ACTIVE' } }),
      this.prisma.student.count({ where: { ...where, status: 'ALUMNI' } }),
      this.prisma.student.count({ where: { ...where, status: 'DROPOUT' } }),
    ]);

    return {
      total,
      distribution: {
        active,
        alumni,
        dropped}};
  }

  async getRevenueAnalytics( query: AnalyticsQueryDto) {
    const where = this.buildWhereClause( query);

    const [invoicesAgg, invoicesList] = await Promise.all([
      this.prisma.invoice.aggregate({
        where,
        _sum: {
          totalAmount: true,
          paidAmount: true,
          discount: true}}),
      this.prisma.invoice.groupBy({
        by: ['status'],
        where,
        _count: {
          id: true},
        _sum: {
          totalAmount: true}}),
    ]);

    return {
      totalInvoiced: invoicesAgg._sum.totalAmount || 0,
      totalPaid: invoicesAgg._sum.paidAmount || 0,
      totalDiscounts: invoicesAgg._sum.discount || 0,
      totalPending: (invoicesAgg._sum.totalAmount || 0) - (invoicesAgg._sum.paidAmount || 0),
      byStatus: invoicesList.map((item) => ({
        status: item.status,
        count: item._count.id,
        amount: item._sum.totalAmount}))};
  }

  async getAttendanceAnalytics( query: AnalyticsQueryDto) {
    // Note: This is a simplified attendance calculation
    // In a real scenario, you'd aggregate attendance records directly.
    const where = {
      attendance: {
        
        ...(query.branchId && { branchId: query.branchId })},
      ...(query.startDate && query.endDate && {
        createdAt: {
          gte: new Date(query.startDate),
          lte: new Date(query.endDate)}})};

    const records = await this.prisma.attendanceRecord.groupBy({
      by: ['status'],
      where,
      _count: {
        id: true}});

    const total = records.reduce((acc, curr) => acc + curr._count.id, 0);
    const present = records.find((r) => r.status === 'PRESENT')?._count.id || 0;
    const late = records.find((r) => r.status === 'LATE')?._count.id || 0;
    const absent = records.find((r) => r.status === 'ABSENT')?._count.id || 0;

    return {
      totalRecords: total,
      present,
      late,
      absent,
      presentPercentage: total > 0 ? ((present + late) / total) * 100 : 0};
  }

  async getCourseAnalytics( query: AnalyticsQueryDto) {
    const where = this.buildWhereClause( query);

    const [totalCourses, activeCourses, totalBatches, totalSubjects] = await Promise.all([
      this.prisma.course.count({ where: { } }),
      this.prisma.course.count({ where: {  isActive: true } }),
      this.prisma.batch.count({ where }),
      this.prisma.subject.count({ where: { } }),
    ]);

    return {
      totalCourses,
      activeCourses,
      totalBatches,
      totalSubjects};
  }

  async getFacultyAnalytics( query: AnalyticsQueryDto) {
    const where = this.buildWhereClause( query);

    const [totalStaff, activeStaff, onLeaveStaff, byDepartment] = await Promise.all([
      this.prisma.staff.count({ where }),
      this.prisma.staff.count({ where: { ...where, status: 'ACTIVE' } }),
      this.prisma.staff.count({ where: { ...where, status: 'ON_LEAVE' } }),
      this.prisma.staff.groupBy({
        by: ['department'],
        where,
        _count: {
          id: true}}),
    ]);

    return {
      totalStaff,
      activeStaff,
      onLeaveStaff,
      departments: byDepartment.map((d) => ({
        department: d.department || 'Unassigned',
        count: d._count.id}))};
  }

  async getLeadAnalytics(query: AnalyticsQueryDto) {
    const where = this.buildWhereClause(query);
    
    const [totalLeads, convertedLeads, lostLeads] = await Promise.all([
      this.prisma.enquiry.count({ where }),
      this.prisma.enquiry.count({ where: { ...where, status: 'CONVERTED' } }),
      this.prisma.enquiry.count({ where: { ...where, status: 'LOST' } }),
    ]);

    return {
      totalLeads,
      convertedLeads,
      lostLeads,
      conversionRate: totalLeads > 0 ? (convertedLeads / totalLeads) * 100 : 0
    };
  }

  async getOperationsAnalytics(query: AnalyticsQueryDto) {
    const where = this.buildWhereClause(query);
    
    const [openTickets, resolvedTickets, pendingApprovals] = await Promise.all([
      this.prisma.supportTicket.count({ where: { ...where, status: 'OPEN' } }),
      this.prisma.supportTicket.count({ where: { ...where, status: 'RESOLVED' } }),
      this.prisma.approvalRequest.count({ where: { ...where, status: 'PENDING' } }),
    ]);

    return {
      openTickets,
      resolvedTickets,
      pendingApprovals
    };
  }

  async getSystemAnalytics(query: AnalyticsQueryDto) {
    // Mock system stats since this usually comes from APM or Prometheus
    return {
      cpuUsage: '45%',
      memoryUsage: '60%',
      activeUsers: 124,
      uptime: '99.9%'
    };
  }

  async getAcademicAnalytics(query: AnalyticsQueryDto) {
    const where = this.buildWhereClause(query);
    
    const [activeCourses, activeBatches] = await Promise.all([
      this.prisma.course.count({ where: { ...where, isActive: true } }),
      this.prisma.batch.count({ where }),
    ]);

    return {
      activeCourses,
      activeBatches,
      averageAttendance: '85%' // Mock average attendance
    };
  }

  async getBranchAnalytics(query: AnalyticsQueryDto) {
    const branches = await this.prisma.branch.findMany({
      include: {
        _count: {
          select: { students: true, staff: true }
        }
      }
    });
    
    return branches.map(branch => ({
      id: branch.id,
      name: branch.name,
      students: branch._count.students,
      staff: branch._count.staff
    }));
  }
}

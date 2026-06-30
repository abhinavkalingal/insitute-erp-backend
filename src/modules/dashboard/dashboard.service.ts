import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../infrastructure/database/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async getReceptionDashboard() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [todayVisitors, newEnquiries, appointmentsToday, pendingDocuments] = await Promise.all([
      this.prisma.visitor.count({ where: { checkInAt: { gte: today } } }),
      this.prisma.enquiry.count({ where: { status: 'NEW' } }),
      this.prisma.visitor.count({ where: { status: 'CHECKED_IN' } }),
      0, // Placeholder for pending documents
    ]);

    const recentActivity = await this.prisma.visitor.findMany({
      take: 5,
      orderBy: { checkInAt: 'desc' },
      select: { name: true, purpose: true, checkInAt: true },
    });

    return {
      stats: {
        todayVisitors,
        newEnquiries,
        appointmentsToday,
        pendingDocuments,
      },
      recentActivity,
    };
  }

  async getOperationsDashboard() {
    const [openTickets, maintenanceTasks, unresolvedIssues] = await Promise.all([
      this.prisma.supportTicket.count({ where: { status: 'OPEN' } }),
      this.prisma.supportTicket.count({ where: { category: 'FACILITY', status: { not: 'RESOLVED' } } }),
      this.prisma.supportTicket.count({ where: { status: { notIn: ['RESOLVED', 'CLOSED'] } } }),
    ]);

    return {
      stats: {
        openTickets,
        maintenanceTasks,
        unresolvedIssues,
        inventoryAlerts: 3, // Placeholder
      },
    };
  }

  async getMarketingDashboard() {
    const [activeCampaigns, totalLeads, newLeadsToday] = await Promise.all([
      this.prisma.campaign.count({ where: { status: 'RUNNING' } }),
      this.prisma.lead.count(),
      this.prisma.lead.count({ where: { createdAt: { gte: new Date(new Date().setHours(0, 0, 0, 0)) } } }),
    ]);

    return {
      stats: {
        activeCampaigns,
        totalLeads,
        newLeadsToday,
        conversions: Math.floor(totalLeads * 0.15), // Simulated 15% conversion rate for now
      },
    };
  }

  async getDirectorDashboard() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [
      pendingApprovals, 
      totalStudents, 
      totalRevenueAgg, 
      activeBatches, 
      attendanceRecords
    ] = await Promise.all([
      this.prisma.approvalRequest.count({ where: { status: 'PENDING' } }),
      this.prisma.student.count(),
      this.prisma.payment.aggregate({ _sum: { amount: true }, where: { status: 'COMPLETED' } }),
      this.prisma.batch.count(),
      this.prisma.attendanceRecord.groupBy({ by: ['status'], _count: { id: true }, where: { createdAt: { gte: today } } }),
    ]);

    const present = attendanceRecords.find(r => r.status === 'PRESENT')?._count.id || 0;
    const totalAttendance = attendanceRecords.reduce((acc, curr) => acc + curr._count.id, 0);
    const attendancePercentage = totalAttendance > 0 ? (present / totalAttendance) * 100 : 0;

    // Dummy revenue/expenses data for chart (Last 6 months)
    const revenueVsExpenses = [
      { month: 'Jan', revenue: 850000, expenses: 600000 },
      { month: 'Feb', revenue: 920000, expenses: 610000 },
      { month: 'Mar', revenue: 880000, expenses: 620000 },
      { month: 'Apr', revenue: 1100000, expenses: 650000 },
      { month: 'May', revenue: 1150000, expenses: 660000 },
      { month: 'Jun', revenue: Math.floor(totalRevenueAgg._sum.amount || 1200000), expenses: 680000 },
    ];

    // Dummy admissions pipeline
    const admissionsPipeline = [
      { label: 'Main', value: 450 },
      { label: 'North', value: 280 },
      { label: 'South', value: 310 },
      { label: 'East', value: 150 },
      { label: 'West', value: 190 },
    ];

    const tasks = [
      { id: '1', title: 'Approve Pending Requests', dueDate: 'Today', priority: 'high' },
      { id: '2', title: 'Review Monthly Budget', dueDate: 'Tomorrow', priority: 'normal' },
    ];

    const activities = [
      { title: 'New Student Enrollment', description: 'System Admin added a student.', time: '10 mins ago', severity: 'success' },
      { title: 'Payment Received', description: 'Batch 101 Fee Collection', time: '1 hr ago', severity: 'info' },
    ];

    return {
      stats: {
        totalStudents,
        totalRevenue: totalRevenueAgg._sum.amount || 0,
        activeBatches,
        attendancePercentage: Math.round(attendancePercentage),
        pendingApprovals,
        activeCampaigns: await this.prisma.campaign.count({ where: { status: 'RUNNING' } }),
      },
      charts: {
        revenueVsExpenses,
        admissionsPipeline,
      },
      tasks,
      activities,
    };
  }

  async getFinanceDashboard() {
    const [totalRevenue, pendingPayments, recentPayments, pendingApprovalsData] = await Promise.all([
      this.prisma.payment.aggregate({ _sum: { amount: true }, where: { status: 'COMPLETED' } }),
      this.prisma.payment.aggregate({ _sum: { amount: true }, where: { status: 'PENDING' } }),
      this.prisma.payment.findMany({ take: 5, orderBy: { createdAt: 'desc' }, include: { invoice: { include: { student: { include: { user: true } } } } } }),
      this.prisma.approvalRequest.findMany({ take: 3, where: { status: 'PENDING' }, orderBy: { createdAt: 'desc' }, include: { requester: true } }),
    ]);

    const recentTransactions = recentPayments.map(p => ({
      id: p.id,
      desc: p.invoice ? `Fee Payment - ${p.invoice.student?.user?.firstName ?? ''} ${p.invoice.student?.user?.lastName ?? ''}` : 'General Payment',
      amount: `+₹${p.amount}`,
      status: p.status,
      date: p.createdAt.toISOString(),
      isCredit: true,
    }));

    // Add a dummy expense to recent transactions for realism until Expense module is built
    recentTransactions.push({
      id: 'EXP-402',
      desc: 'AWS Cloud Hosting',
      amount: '-₹450.00',
      status: 'COMPLETED',
      date: new Date().toISOString(),
      isCredit: false,
    });

    const pendingApprovals = pendingApprovalsData.map(a => ({
      id: a.id,
      title: a.type || 'Approval Request',
      subtitle: a.requester ? `${a.requester.firstName} ${a.requester.lastName}` : 'System',
      amount: a.amount?.toString() || 'N/A',
    }));

    return {
      stats: {
        totalRevenue: totalRevenue._sum.amount || 0,
        outstandingFees: pendingPayments._sum.amount || 0,
        totalExpenses: 12450.00,
        bankBalance: 128900.50,
      },
      recentTransactions,
      pendingApprovals,
    };
  }

  async getHrDashboard() {
    const [totalEmployees, onLeaveToday, openPositions] = await Promise.all([
      this.prisma.staff.count(),
      this.prisma.leaveRequest.count({ where: { status: 'APPROVED', startDate: { lte: new Date() }, endDate: { gte: new Date() } } }),
      3, // Placeholder for open positions
    ]);

    return {
      stats: {
        totalEmployees,
        onLeaveToday,
        openPositions,
        pendingApprovals: await this.prisma.leaveRequest.count({ where: { status: 'PENDING' } }),
      },
    };
  }
}

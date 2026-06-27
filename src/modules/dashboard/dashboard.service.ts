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
    const [pendingApprovals, totalStudents, totalRevenue] = await Promise.all([
      this.prisma.approvalRequest.count({ where: { status: 'PENDING' } }),
      this.prisma.student.count(),
      this.prisma.payment.aggregate({ _sum: { amount: true }, where: { status: 'COMPLETED' } }),
    ]);

    return {
      stats: {
        pendingApprovals,
        totalStudents,
        totalRevenue: totalRevenue._sum.amount || 0,
        activeCampaigns: await this.prisma.campaign.count({ where: { status: 'RUNNING' } }),
      },
    };
  }

  async getFinanceDashboard() {
    const [totalRevenue, pendingPayments, totalExpenses] = await Promise.all([
      this.prisma.payment.aggregate({ _sum: { amount: true }, where: { status: 'COMPLETED' } }),
      this.prisma.payment.aggregate({ _sum: { amount: true }, where: { status: 'PENDING' } }),
      0, // Placeholder for expenses
    ]);

    return {
      stats: {
        totalRevenue: totalRevenue._sum.amount || 0,
        pendingPayments: pendingPayments._sum.amount || 0,
        totalExpenses,
        netProfit: (totalRevenue._sum.amount || 0) - totalExpenses,
      },
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

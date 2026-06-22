import { PrismaMasterService } from '@infrastructure/database/prisma-master.service';
import { Injectable } from '@nestjs/common';
import * as os from 'os';

@Injectable()
export class SuperAdminDashboardService {
  constructor(private readonly prisma: PrismaMasterService) {}

  async getFinancialMetrics() {
    // 1. Calculate MRR in JS since price is on the related plan
    const activeSubscriptions = await this.prisma.subscription.findMany({
      where: {
        status: 'ACTIVE'},
      include: {
        plan: true}});

    let mrr = 0;
    for (const sub of activeSubscriptions) {
      // Simplification for MVP
      mrr += sub.plan.monthlyPrice;
    }

    // 2. YTD Revenue (Assuming Current Year for simplicity)
    const currentYear = new Date().getFullYear();
    const startOfYear = new Date(currentYear, 0, 1);

    const ytdRevenue = await this.prisma.saasInvoice.aggregate({
      where: {
        status: 'PAID',
        paidAt: {
          gte: startOfYear}},
      _sum: {
        amount: true}});

    // 3. Pending Revenue
    const pendingRevenue = await this.prisma.saasInvoice.aggregate({
      where: {
        status: 'DRAFT'}, // Using DRAFT instead of DUE
      _sum: {
        amount: true}});

    return {
      mrr: Math.round(mrr * 100) / 100,
      ytdRevenue: ytdRevenue._sum.amount || 0,
      pendingRevenue: pendingRevenue._sum.amount || 0};
  }

  async getTenantMetrics() {
    const subscriptions = await this.prisma.subscription.groupBy({
      by: ['status'],
      _count: {
        id: true}});

    const metrics: Record<string, number> = {
      ACTIVE: 0,
      TRIALING: 0,
      PAST_DUE: 0,
      CANCELED: 0,
      TOTAL: 0};

    subscriptions.forEach((sub) => {
      metrics[sub.status] = sub._count.id;
      metrics.TOTAL += sub._count.id;
    });

    return metrics;
  }

  async getUsageMetrics() {
    // Stubbed for MVP. Cross-database queries require tenant iteration.
    const [students, staff, devices] = await Promise.all([
      Promise.resolve(0),
      Promise.resolve(0),
      Promise.resolve(0),
    ]);

    return {
      totalStudents: students,
      totalStaff: staff,
      activeDevices: devices};
  }

  async getChartData() {
    const months = 6;
    const now = new Date();
    
    const revenueAnalytics: { label: string; value: number }[] = [];
    const userGrowth: { label: string; value: number }[] = [];

    for (let i = months - 1; i >= 0; i--) {
      const monthStart = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthEnd = new Date(now.getFullYear(), now.getMonth() - i + 1, 0, 23, 59, 59, 999);
      const monthLabel = monthStart.toLocaleString('default', { month: 'short' });

      // Revenue for the month
      const revenueAgg = await this.prisma.saasInvoice.aggregate({
        where: {
          status: 'PAID',
          paidAt: {
            gte: monthStart,
            lte: monthEnd,
          },
        },
        _sum: {
          amount: true,
        },
      });
      revenueAnalytics.push({
        label: monthLabel,
        value: revenueAgg._sum.amount || 0,
      });

      // Cumulative active institutes up to that month
      const institutesCount = await this.prisma.institute.count({
        where: {
          createdAt: {
            lte: monthEnd,
          },
          isActive: true,
        },
      });
      
      userGrowth.push({
        label: monthLabel,
        value: institutesCount,
      });
    }

    return {
      revenueAnalytics,
      userGrowth,
    };
  }

  async getRecentActivity() {
    // 1. Recent Institutes
    const recentInstitutes = await this.prisma.institute.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
    });
    
    // 2. Recent Subscription Changes
    const recentSubs = await this.prisma.subscriptionHistory.findMany({
      include: { institute: true },
      orderBy: { createdAt: 'desc' },
      take: 5,
    });

    // 3. Recent Payments
    const recentPayments = await this.prisma.saasPayment.findMany({
      include: { institute: true },
      orderBy: { createdAt: 'desc' },
      take: 5,
    });

    const activities: { type: string; title: string; description: string; timestamp: string; }[] = [];

    for (const inst of recentInstitutes) {
      activities.push({
        type: 'INSTITUTE_REGISTERED',
        title: 'New Institute Registered',
        description: `${inst.name} successfully completed the onboarding process.`,
        timestamp: inst.createdAt.toISOString(),
      });
    }

    for (const sub of recentSubs) {
      activities.push({
        type: 'SUBSCRIPTION_UPDATE',
        title: `Subscription ${sub.action}`,
        description: `${sub.institute.name} changed subscription.`,
        timestamp: sub.createdAt.toISOString(),
      });
    }

    for (const pay of recentPayments) {
      activities.push({
        type: pay.status === 'FAILED' ? 'PAYMENT_FAILED' : 'PAYMENT_SUCCESS',
        title: pay.status === 'FAILED' ? 'Payment Failed' : 'Payment Success',
        description: `Payment for ${pay.institute.name} ${pay.status.toLowerCase()}.`,
        timestamp: pay.createdAt.toISOString(),
      });
    }

    // Sort descending by timestamp
    activities.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    return activities.slice(0, 5);
  }

  async getDashboardData() {
    const [financial, tenants, usage, charts, recentActivity] = await Promise.all([
      this.getFinancialMetrics(),
      this.getTenantMetrics(),
      this.getUsageMetrics(),
      this.getChartData(),
      this.getRecentActivity(),
    ]);

    return {
      financial,
      tenants,
      usage,
      charts,
      recentActivity,
      generatedAt: new Date().toISOString()};
  }

  async getSystemHealth() {
    const totalMemory = os.totalmem();
    const freeMemory = os.freemem();
    const usedMemory = totalMemory - freeMemory;
    
    const cpuLoad = os.loadavg()[0];
    const numCpus = os.cpus().length;
    const cpuUsagePercent = Math.min(100, Math.max(0, Math.round((cpuLoad / numCpus) * 100)));

    // Static storage for MVP as `os` doesn't provide disk usage
    const totalStorage = 5 * 1024 * 1024 * 1024 * 1024; // 5 TB
    const usedStorage = 1.2 * 1024 * 1024 * 1024 * 1024; // 1.2 TB

    return {
      cpuUsagePercent,
      memory: {
        total: totalMemory,
        used: usedMemory,
        free: freeMemory,
      },
      storage: {
        total: totalStorage,
        used: usedStorage,
      },
      uptime: os.uptime(),
    };
  }
}

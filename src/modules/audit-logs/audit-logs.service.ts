import { Injectable } from '@nestjs/common';
import { PrismaService } from '@infrastructure/database/prisma.service';
import { AuditLogQueryDto } from './dto/audit-log-query.dto';

@Injectable()
export class AuditLogsService {
  constructor(private readonly prisma: PrismaService) {}

  private buildWhereClause( type: string, query: AuditLogQueryDto) {
    const where: any = {
      
      type};

    if (query.userId) {
      where.userId = query.userId;
    }
    if (query.action) {
      where.action = query.action;
    }
    if (query.startDate || query.endDate) {
      where.createdAt = {};
      if (query.startDate) where.createdAt.gte = new Date(query.startDate);
      if (query.endDate) where.createdAt.lte = new Date(query.endDate);
    }

    return where;
  }

  async findActivityLogs( query: AuditLogQueryDto) {
    // Includes DATA_CHANGE, SYSTEM_EVENT, SECURITY_EVENT, LOGIN_HISTORY
    // Or we can just return all for 'activity' overview
    const where: any = { };
    
    if (query.userId) where.userId = query.userId;
    if (query.action) where.action = query.action;
    if (query.startDate || query.endDate) {
      where.createdAt = {};
      if (query.startDate) where.createdAt.gte = new Date(query.startDate);
      if (query.endDate) where.createdAt.lte = new Date(query.endDate);
    }

    return this.prisma.auditLog.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: 100,
      include: { user: { select: { email: true, firstName: true, lastName: true } } }});
  }

  async findLoginHistory( query: AuditLogQueryDto) {
    return this.prisma.auditLog.findMany({
      where: this.buildWhereClause( 'LOGIN_HISTORY', query),
      orderBy: { createdAt: 'desc' },
      take: 100,
      include: { user: { select: { email: true, firstName: true, lastName: true } } }});
  }

  async findDataChanges( query: AuditLogQueryDto) {
    return this.prisma.auditLog.findMany({
      where: this.buildWhereClause( 'DATA_CHANGE', query),
      orderBy: { createdAt: 'desc' },
      take: 100,
      include: { user: { select: { email: true, firstName: true, lastName: true } } }});
  }

  async findSecurityEvents( query: AuditLogQueryDto) {
    return this.prisma.auditLog.findMany({
      where: {
        ...this.buildWhereClause( 'SECURITY_EVENT', query),
        OR: [
          { type: 'SECURITY_EVENT' },
          { type: 'SYSTEM_EVENT' },
        ]},
      orderBy: { createdAt: 'desc' },
      take: 100,
      include: { user: { select: { email: true, firstName: true, lastName: true } } }});
  }

  // Legacy method or for specific entity history
  async findByEntity( entity: string, entityId: string) {
    return this.prisma.auditLog.findMany({
      where: {  entity, entityId },
      orderBy: { createdAt: 'desc' },
      include: { user: { select: { email: true, firstName: true, lastName: true } } }});
  }
}

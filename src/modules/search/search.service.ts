import { Injectable } from '@nestjs/common';
import { PrismaService } from '@infrastructure/database/prisma.service';

export interface SearchResultItem {
  id: string;
  type: 'STUDENT' | 'STAFF' | 'COURSE' | 'INVOICE' | 'EVENT';
  title: string;
  subtitle: string;
  url: string;
}

@Injectable()
export class SearchService {
  constructor(private readonly prisma: PrismaService) {}

  async globalSearch( q: string): Promise<SearchResultItem[]> {
    const query = q.toLowerCase();
    const limit = 5; // Cap at 5 results per entity for performance

    // 1. Students Search
    const students = await this.prisma.student.findMany({
      where: {
        
        OR: [
          { enrollmentNo: { contains: query, mode: 'insensitive' } },
          { user: { firstName: { contains: query, mode: 'insensitive' } } },
          { user: { lastName: { contains: query, mode: 'insensitive' } } },
          { user: { email: { contains: query, mode: 'insensitive' } } },
        ]},
      include: { user: true },
      take: limit});

    // 2. Staff Search
    const staff = await this.prisma.staff.findMany({
      where: {
        
        OR: [
          { employeeId: { contains: query, mode: 'insensitive' } },
          { user: { firstName: { contains: query, mode: 'insensitive' } } },
          { user: { lastName: { contains: query, mode: 'insensitive' } } },
          { user: { email: { contains: query, mode: 'insensitive' } } },
        ]},
      include: { user: true },
      take: limit});

    // 3. Course Search
    const courses = await this.prisma.course.findMany({
      where: {
        
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { code: { contains: query, mode: 'insensitive' } },
        ]},
      take: limit});

    // 4. Invoice Search
    const invoices = await this.prisma.invoice.findMany({
      where: {
        
        invoiceNumber: { contains: query, mode: 'insensitive' }},
      take: limit});

    // 5. Event Search
    const events = await this.prisma.event.findMany({
      where: {
        
        title: { contains: query, mode: 'insensitive' }},
      take: limit});

    // Map all results to the unified interface
    const results: SearchResultItem[] = [];

    students.forEach((s) => {
      results.push({
        id: s.id,
        type: 'STUDENT',
        title: `${s.user.firstName} ${s.user.lastName}`,
        subtitle: `Enrollment: ${s.enrollmentNo || 'N/A'} | Email: ${s.user.email}`,
        url: `/students/${s.id}`});
    });

    staff.forEach((s) => {
      results.push({
        id: s.id,
        type: 'STAFF',
        title: `${s.user.firstName} ${s.user.lastName}`,
        subtitle: `Employee ID: ${s.employeeId} | Email: ${s.user.email}`,
        url: `/staff/${s.id}`});
    });

    courses.forEach((c) => {
      results.push({
        id: c.id,
        type: 'COURSE',
        title: c.name,
        subtitle: `Course Code: ${c.code}`,
        url: `/courses/${c.id}`});
    });

    invoices.forEach((inv) => {
      results.push({
        id: inv.id,
        type: 'INVOICE',
        title: `Invoice: ${inv.invoiceNumber}`,
        subtitle: `Amount: ${inv.totalAmount} | Status: ${inv.status}`,
        url: `/finance/invoices/${inv.id}`});
    });

    events.forEach((evt) => {
      results.push({
        id: evt.id,
        type: 'EVENT',
        title: evt.title,
        subtitle: `Date: ${evt.startDate.toISOString().split('T')[0]}`,
        url: `/events/${evt.id}`});
    });

    return results;
  }
}

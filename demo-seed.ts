import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module';
import { InstitutesService } from './src/modules/institutes/institutes.service';
import { CreateInstituteDto } from './src/modules/institutes/dto/create-institute.dto';
import { AuthService } from './src/modules/auth/auth.service';
import { PrismaMasterService } from './src/infrastructure/database/prisma-master.service';

async function bootstrap() {
  console.log('Starting demo seed generator...');
  const app = await NestFactory.createApplicationContext(AppModule);
  
  const institutesService = app.get(InstitutesService);
  const prismaMaster = app.get(PrismaMasterService);

  // Clean up any existing demo institute
  const existingInsts = await prismaMaster.institute.findMany({ where: { domain: 'globaltech' } });
  for (const inst of existingInsts) {
    console.log(`Cleaning up existing demo institute: ${inst.id}`);
    await prismaMaster.institute.delete({ where: { id: inst.id } });
  }

  // 1. Create a dummy Institute
  console.log('Creating demo Institute: Global Tech University...');
  const createDto: CreateInstituteDto = {
    name: 'Global Tech University',
    domain: 'globaltech',
    databaseUrl: 'postgresql://postgres:abhi9072@localhost:5432/erp_master?schema=tenant_globaltech',
    profile: {
      address: '123 Innovation Drive, Silicon Valley, CA',
      phone: '+1 555-0198',
      contactEmail: 'admin@globaltech.edu',
      website: 'www.globaltech.edu',
      establishedYear: 2005,
      adminName: 'Alice Smith'
    },
    settings: {
      branding: {
        primaryColor: '#0055ff',
        logoUrl: 'https://placehold.co/400x400/png?text=GTU'
      }
    }
  };

  const instituteResult = await institutesService.create(createDto);
  const instituteId = instituteResult.id;
  console.log(`Institute Created successfully! ID: ${instituteId}`);

  // Wait a few seconds for tenant DB to fully sync
  await new Promise((resolve) => setTimeout(resolve, 3000));

  console.log('Waiting for tenant DB provisioning to complete (15 seconds)...');
  await new Promise(resolve => setTimeout(resolve, 15000));
  
  // Now, connect to the new tenant DB and seed dummy data
  const { PrismaTenantService } = require('./src/infrastructure/database/prisma-tenant.service');
  const prismaTenant = await app.resolve(PrismaTenantService);
  
  // Use the same connection string logic as the institute creation
  // Let's just fetch it from Master DB again
  const newInst = await prismaMaster.institute.findUnique({ where: { id: instituteId } });
  if (!newInst || !newInst.databaseUrl) {
    throw new Error('Database URL not found for new institute');
  }
  const tenantPrisma = prismaTenant.getClient(newInst.databaseUrl);

  console.log('Seeding demo Branches and Courses...');
  const branch = await tenantPrisma.branch.create({
    data: {
      name: 'Main Campus',
      address: {
        line1: '123 Innovation Drive',
        city: 'Silicon Valley',
        country: 'USA'
      },
      settings: {
        contactEmail: 'main@globaltech.edu',
        contactPhone: '555-0199',
      }
    }
  });

  const course = await tenantPrisma.course.create({
    data: {
      name: "Computer Science B.Tech",
      code: "CSE-BTECH",
      description: "4 Years Degree Program"
    }
  });

  console.log('Seeding demo Staff and Students...');
  const teacherUser = await tenantPrisma.user.create({
    data: {
      email: 'john.teacher@globaltech.edu',
      firstName: 'John',
      lastName: 'Doe',
      passwordHash: 'password', // Fake hash
      isEmailVerified: true,
    }
  });

  await tenantPrisma.staff.create({
    data: {
      userId: teacherUser.id,
      branchId: branch.id,
      employeeId: 'EMP-001',
      department: 'Computer Science',
      designation: 'Professor',
      status: 'ACTIVE'
    }
  });

  const studentUser = await tenantPrisma.user.create({
    data: {
      email: 'bob.student@globaltech.edu',
      firstName: 'Bob',
      lastName: 'Student',
      passwordHash: 'password',
      isEmailVerified: true,
    }
  });

  await tenantPrisma.student.create({
    data: {
      userId: studentUser.id,
      branchId: branch.id,
      courseId: course.id,
      enrollmentNo: 'CS2026-001',
      status: 'ACTIVE',
      profile: {
        dateOfBirth: '2005-01-01',
        gender: 'MALE',
        bloodGroup: 'O+',
        contactNumber: '555-1234',
        address: '456 Student Lane',
      }
    }
  });

  console.log('============================================');
  console.log('Demo Seed Completed Successfully!');
  console.log('============================================');
  console.log('You can now log in to the Tenant ERP Software using:');
  console.log('Email: alice.admin@globaltech.edu');
  console.log('Password: Password123!');
  console.log('Institute ID: ' + instituteId);
  console.log('============================================');

  await app.close();
  process.exit(0);
}

bootstrap().catch((err) => {
  console.error('Failed to run demo seed:', err);
  process.exit(1);
});

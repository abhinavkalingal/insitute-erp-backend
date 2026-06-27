process.env.DATABASE_URL = 'postgresql://postgres:abhi9072@localhost:5432/institute_erp_tenant';
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function runE2E() {
  console.log('--- Starting E2E Lifecycle Verification ---');
  try {
    // Step 1: Admission
    console.log('\n[Step 1] Creating new student...');
    const student = await prisma.student.create({
      data: {
        firstName: 'E2E',
        lastName: 'TestUser',
        email: `e2e.test.${Date.now()}@example.com`,
        phone: `+1${Date.now().toString().substring(0, 9)}`,
        status: 'ENROLLED',
        branchId: 'hq', // mock
        courseId: 'ds' // mock
      }
    });
    console.log(`✅ Student created successfully! ID: ${student.id}`);

    // Step 2: Invoicing
    console.log('\n[Step 2] Generating Invoice...');
    const invoice = await prisma.invoice.create({
      data: {
        studentId: student.id,
        title: 'Tuition Fee - Semester 1',
        amount: 25000,
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        status: 'PENDING'
      }
    });
    console.log(`✅ Invoice created successfully! ID: ${invoice.id} Status: ${invoice.status}`);

    // Step 3: Fee Collection
    console.log('\n[Step 3] Processing Payment...');
    const updatedInvoice = await prisma.invoice.update({
      where: { id: invoice.id },
      data: { status: 'PAID' }
    });
    console.log(`✅ Invoice status updated to ${updatedInvoice.status}!`);

    // Step 4: Attendance
    console.log('\n[Step 4] Updating Attendance...');
    const updatedStudent = await prisma.student.update({
      where: { id: student.id },
      data: {
        profile: {
          attendance: '100%',
          medicalInfo: 'None'
        }
      }
    });
    console.log('✅ Attendance updated successfully! Profile:', JSON.stringify(updatedStudent.profile));

    console.log('\n🎉 E2E TEST COMPLETED SUCCESSFULLY! 🎉');
  } catch (err) {
    console.error('❌ E2E Test Failed:', err.message);
  } finally {
    await prisma.$disconnect();
  }
}

runE2E();

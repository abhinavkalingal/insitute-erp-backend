import { Controller, Get, Post, Body, Patch, Param, Query, Delete } from '@nestjs/common';
import { PlacementsService } from './placements.service';
import { Prisma } from '@prisma/client';

@Controller('placements')
export class PlacementsController {
  constructor(private readonly placementsService: PlacementsService) {}

  // --- Companies ---
  @Post('companies')
  createCompany(@Body() data: Prisma.CompanyCreateInput) {
    return this.placementsService.createCompany(data);
  }

  @Get('companies')
  getCompanies() {
    return this.placementsService.getCompanies();
  }

  @Patch('companies/:id')
  updateCompany(@Param('id') id: string, @Body() data: Prisma.CompanyUpdateInput) {
    return this.placementsService.updateCompany(id, data);
  }

  @Delete('companies/:id')
  deleteCompany(@Param('id') id: string) {
    return this.placementsService.deleteCompany(id);
  }

  // --- Drives ---
  @Post('drives')
  createDrive(@Body() data: Prisma.PlacementDriveCreateInput) {
    return this.placementsService.createDrive(data);
  }

  @Get('drives')
  getDrives() {
    return this.placementsService.getDrives();
  }

  @Patch('drives/:id')
  updateDrive(@Param('id') id: string, @Body() data: Prisma.PlacementDriveUpdateInput) {
    return this.placementsService.updateDrive(id, data);
  }

  @Delete('drives/:id')
  deleteDrive(@Param('id') id: string) {
    return this.placementsService.deleteDrive(id);
  }

  // --- Jobs ---
  @Post('jobs')
  createJobPosting(@Body() data: Prisma.JobPostingCreateInput) {
    return this.placementsService.createJobPosting(data);
  }

  @Get('jobs')
  getJobPostings(@Query('driveId') driveId?: string) {
    return this.placementsService.getJobPostings(driveId);
  }

  @Patch('jobs/:id')
  updateJobPosting(@Param('id') id: string, @Body() data: Prisma.JobPostingUpdateInput) {
    return this.placementsService.updateJobPosting(id, data);
  }

  @Delete('jobs/:id')
  deleteJobPosting(@Param('id') id: string) {
    return this.placementsService.deleteJobPosting(id);
  }

  // --- Applications ---
  @Get('jobs/:id/applications')
  getApplications(@Param('id') jobId: string) {
    return this.placementsService.getApplications(jobId);
  }

  @Patch('applications/:id/status')
  updateApplicationStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.placementsService.updateApplicationStatus(id, status);
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FormsService } from './forms.service';
import { Prisma } from '@prisma/client';

@Controller('forms')
export class FormsController {
  constructor(private readonly formsService: FormsService) {}

  @Post()
  createForm(@Body() data: Prisma.CustomFormCreateInput) {
    return this.formsService.createForm(data);
  }

  @Get()
  getForms() {
    return this.formsService.getForms();
  }

  @Get(':id')
  getFormById(@Param('id') id: string) {
    return this.formsService.getFormById(id);
  }

  @Patch(':id')
  updateForm(@Param('id') id: string, @Body() data: Prisma.CustomFormUpdateInput) {
    return this.formsService.updateForm(id, data);
  }

  @Delete(':id')
  deleteForm(@Param('id') id: string) {
    return this.formsService.deleteForm(id);
  }

  @Post(':id/submit')
  submitForm(@Param('id') formId: string, @Body() data: Prisma.FormSubmissionCreateInput) {
    // Note: data.form is handled in service
    const { form, ...submissionData } = data as any;
    return this.formsService.submitForm(formId, submissionData);
  }

  @Get(':id/submissions')
  getSubmissions(@Param('id') formId: string) {
    return this.formsService.getSubmissions(formId);
  }
}

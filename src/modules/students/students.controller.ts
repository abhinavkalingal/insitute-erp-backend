import { RequirePermissions } from '@core/decorators/permissions.decorator';
import { PermissionsGuard } from '@core/guards/permissions.guard';
import { ApiPaginatedResponse } from '@core/utils/pagination/api-paginated-response.decorator';
import { StorageService } from '@modules/storage/storage.service';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CreateStudentDto } from './dto/create-student.dto';
import { LinkGuardianDto } from './dto/link-guardian.dto';
import { StudentQueryOptionsDto } from './dto/student-query-options.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { StudentsService } from './students.service';

@ApiTags('Students')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
@Controller('students')
export class StudentsController {
  constructor(
    private readonly studentsService: StudentsService,
    private readonly storageService: StorageService,
  ) {}

  @Post()
  @RequirePermissions('create:users')
  @ApiOperation({ summary: 'Create a new student (and User)' })
  create( @Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.create( createStudentDto);
  }

  @Get()
  @RequirePermissions('read:users')
  @ApiOperation({ summary: 'Get all students with pagination and filters' })
  @ApiPaginatedResponse(CreateStudentDto)
  findAll( @Query() queryOptions: StudentQueryOptionsDto) {
    return this.studentsService.findAll( queryOptions);
  }

  @Get(':id')
  @RequirePermissions('read:users')
  @ApiOperation({ summary: 'Get student by ID' })
  findOne( @Param('id') id: string) {
    return this.studentsService.findOne(id, );
  }

  @Patch(':id')
  @RequirePermissions('update:users')
  @ApiOperation({ summary: 'Update a student' })
  update(
    
    @Param('id') id: string,
    @Body() updateStudentDto: UpdateStudentDto,
  ) {
    return this.studentsService.update(id,  updateStudentDto);
  }

  @Post(':id/guardians')
  @RequirePermissions('update:users')
  @ApiOperation({ summary: 'Link a guardian to a student' })
  linkGuardian(
    
    @Param('id') id: string,
    @Body() linkGuardianDto: LinkGuardianDto,
  ) {
    return this.studentsService.linkGuardian(id,  linkGuardianDto);
  }

  @Post(':id/documents')
  @RequirePermissions('update:users')
  @ApiOperation({ summary: 'Upload a document for a student' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary'}}}})
  @UseInterceptors(FileInterceptor('file'))
  async uploadDocument(
    
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('No file provided');
    }
    const documentUrl = await this.storageService.uploadFile(file);
    return this.studentsService.uploadDocument(
      id,
      
      documentUrl,
      file.originalname,
      file.mimetype,
    );
  }

  @Delete(':id')
  @RequirePermissions('delete:users')
  @ApiOperation({ summary: 'Soft delete a student and their User login' })
  remove( @Param('id') id: string) {
    return this.studentsService.remove(id, );
  }
}

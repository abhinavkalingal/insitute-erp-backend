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

import { CreateStaffDto } from './dto/create-staff.dto';
import { StaffQueryOptionsDto } from './dto/staff-query-options.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { StaffService } from './staff.service';

@ApiTags('Staff')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
@Controller('staff')
export class StaffController {
  constructor(
    private readonly staffService: StaffService,
    private readonly storageService: StorageService,
  ) {}

  @Post()
  @RequirePermissions('create:users') // Usually staff creation maps to user creation permissions
  @ApiOperation({ summary: 'Create a new staff member (and User)' })
  create( @Body() createStaffDto: CreateStaffDto) {
    return this.staffService.create( createStaffDto);
  }

  @Get()
  @RequirePermissions('read:users')
  @ApiOperation({ summary: 'Get all staff members with pagination and filters' })
  @ApiPaginatedResponse(CreateStaffDto)
  findAll( @Query() queryOptions: StaffQueryOptionsDto) {
    return this.staffService.findAll( queryOptions);
  }

  @Get(':id')
  @RequirePermissions('read:users')
  @ApiOperation({ summary: 'Get staff member by ID' })
  findOne( @Param('id') id: string) {
    return this.staffService.findOne(id, );
  }

  @Patch(':id')
  @RequirePermissions('update:users')
  @ApiOperation({ summary: 'Update a staff member' })
  update(
    
    @Param('id') id: string,
    @Body() updateStaffDto: UpdateStaffDto,
  ) {
    return this.staffService.update(id,  updateStaffDto);
  }

  @Post(':id/documents')
  @RequirePermissions('update:users')
  @ApiOperation({ summary: 'Upload a document for a staff member' })
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
    return this.staffService.uploadDocument(
      id,
      
      documentUrl,
      file.originalname,
      file.mimetype,
    );
  }

  @Delete(':id')
  @RequirePermissions('delete:users')
  @ApiOperation({ summary: 'Soft delete a staff member and their User login' })
  remove( @Param('id') id: string) {
    return this.staffService.remove(id, );
  }
}

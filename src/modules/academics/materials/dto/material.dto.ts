import { PageOptionsDto } from '@core/utils/pagination/page-options.dto';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID, ValidateIf } from 'class-validator';

export enum MaterialType {
  DOCUMENT = 'DOCUMENT',
  VIDEO_LINK = 'VIDEO_LINK'}

export class CreateMaterialDto {
  @ApiProperty({ example: 'uuid-of-category' })
  @IsUUID()
  @IsNotEmpty()
  categoryId: string;

  @ApiProperty({ example: 'Chapter 1 Notes' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional({ example: 'Intro to basic concepts' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ enum: MaterialType })
  @IsEnum(MaterialType)
  type: string;

  @ApiPropertyOptional({ example: 'https://storage/file.pdf' })
  @ValidateIf((o) => o.type === MaterialType.DOCUMENT)
  @IsString()
  @IsNotEmpty()
  fileUrl?: string;

  @ApiPropertyOptional({ example: 'https://youtube.com/watch?v=...' })
  @ValidateIf((o) => o.type === MaterialType.VIDEO_LINK)
  @IsString()
  @IsNotEmpty()
  videoUrl?: string;

  @ApiProperty({ example: 'uuid-of-staff' })
  @IsUUID()
  @IsNotEmpty()
  staffId: string;

  @ApiProperty({ example: 'uuid-of-subject' })
  @IsUUID()
  @IsNotEmpty()
  subjectId: string;

  @ApiPropertyOptional({ example: 'uuid-of-course' })
  @IsUUID()
  @IsOptional()
  courseId?: string;

  @ApiPropertyOptional({ example: 'uuid-of-batch' })
  @IsUUID()
  @IsOptional()
  batchId?: string;
}

export class UpdateMaterialDto extends PartialType(CreateMaterialDto) {}

export class MaterialQueryOptionsDto extends PageOptionsDto {
  @ApiPropertyOptional()
  @IsUUID()
  @IsOptional()
  readonly categoryId?: string;

  @ApiPropertyOptional()
  @IsUUID()
  @IsOptional()
  readonly subjectId?: string;

  @ApiPropertyOptional()
  @IsUUID()
  @IsOptional()
  readonly courseId?: string;

  @ApiPropertyOptional()
  @IsUUID()
  @IsOptional()
  readonly batchId?: string;

  @ApiPropertyOptional()
  @IsUUID()
  @IsOptional()
  readonly staffId?: string;
}

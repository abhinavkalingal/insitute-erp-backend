import { PageOptionsDto } from '@core/utils/pagination/page-options.dto';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTemplateDto {
  @ApiProperty({ example: 'Course Completion' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '<h1>Awarded to {{studentName}} on {{issueDate}}</h1>' })
  @IsString()
  @IsNotEmpty()
  contentHtml: string;

  @ApiPropertyOptional({ example: 'https://storage/cert-bg.png' })
  @IsString()
  @IsOptional()
  backgroundUrl?: string;
}

export class UpdateTemplateDto extends PartialType(CreateTemplateDto) {}

export class TemplateQueryOptionsDto extends PageOptionsDto {}

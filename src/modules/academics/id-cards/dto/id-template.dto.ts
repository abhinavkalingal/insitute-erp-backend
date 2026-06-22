import { PageOptionsDto } from '@core/utils/pagination/page-options.dto';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export enum IdCardRoleType {
  STUDENT = 'STUDENT',
  STAFF = 'STAFF',
  TEMPORARY = 'TEMPORARY'}

export class CreateIdTemplateDto {
  @ApiProperty({ example: 'Standard Student ID' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ enum: IdCardRoleType, example: IdCardRoleType.STUDENT })
  @IsEnum(IdCardRoleType)
  @IsNotEmpty()
  roleType: string;

  @ApiProperty({ example: '<div class="id-card"><h1>{{holderName}}</h1></div>' })
  @IsString()
  @IsNotEmpty()
  contentHtml: string;

  @ApiPropertyOptional({ example: 'https://storage/id-bg.png' })
  @IsString()
  @IsOptional()
  backgroundUrl?: string;
}

export class UpdateIdTemplateDto extends PartialType(CreateIdTemplateDto) {}

export class IdTemplateQueryOptionsDto extends PageOptionsDto {
  @ApiPropertyOptional({ enum: IdCardRoleType })
  @IsEnum(IdCardRoleType)
  @IsOptional()
  readonly roleType?: string;
}

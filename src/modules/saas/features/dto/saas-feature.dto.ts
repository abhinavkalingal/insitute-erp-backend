import { PageOptionsDto } from '@core/utils/pagination/page-options.dto';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export enum SaasFeatureType {
  BOOLEAN = 'BOOLEAN',
  LIMIT = 'LIMIT'}

export class CreateSaasFeatureDto {
  @ApiProperty({ example: 'MAX_BRANCHES' })
  @IsString()
  @IsNotEmpty()
  key: string;

  @ApiProperty({ example: 'Maximum Branches' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ example: 'Max number of branches allowed' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ enum: SaasFeatureType })
  @IsEnum(SaasFeatureType)
  @IsNotEmpty()
  type: string;
}

export class UpdateSaasFeatureDto extends PartialType(CreateSaasFeatureDto) {}

export class SaasFeatureQueryOptionsDto extends PageOptionsDto {
  @ApiPropertyOptional({ enum: SaasFeatureType })
  @IsOptional()
  readonly type?: string;
}

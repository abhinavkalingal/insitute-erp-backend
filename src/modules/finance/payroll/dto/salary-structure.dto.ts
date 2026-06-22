import { PageOptionsDto } from '@core/utils/pagination/page-options.dto';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Min,
  ValidateNested} from 'class-validator';

export class SalaryComponentDto {
  @ApiProperty({ example: 'Housing Allowance' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 500 })
  @IsNumber()
  @Min(0)
  amount: number;

  @ApiProperty({ example: 'FIXED' })
  @IsString()
  @IsNotEmpty()
  type: string;
}

export class CreateSalaryStructureDto {
  @ApiProperty({ example: 'uuid-of-staff' })
  @IsUUID()
  @IsNotEmpty()
  staffId: string;

  @ApiProperty({ example: 3000 })
  @IsNumber()
  @Min(0)
  basicPay: number;

  @ApiPropertyOptional({ type: [SalaryComponentDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SalaryComponentDto)
  @IsOptional()
  allowances?: SalaryComponentDto[];

  @ApiPropertyOptional({ type: [SalaryComponentDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SalaryComponentDto)
  @IsOptional()
  deductions?: SalaryComponentDto[];
}

export class UpdateSalaryStructureDto extends PartialType(CreateSalaryStructureDto) {}

export class SalaryStructureQueryOptionsDto extends PageOptionsDto {
  @ApiPropertyOptional()
  @IsUUID()
  @IsOptional()
  readonly staffId?: string;
}

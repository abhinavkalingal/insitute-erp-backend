import { PageOptionsDto } from '@core/utils/pagination/page-options.dto';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, Min } from 'class-validator';

export class CreateStaffLoanDto {
  @ApiProperty({ example: 'uuid-of-staff' })
  @IsUUID()
  @IsNotEmpty()
  staffId: string;

  @ApiProperty({ example: 1000 })
  @IsNumber()
  @Min(1)
  amount: number;

  @ApiProperty({ example: 'Medical Emergency' })
  @IsString()
  @IsNotEmpty()
  reason: string;

  @ApiProperty({ example: 100 })
  @IsNumber()
  @Min(1)
  deductionPerMonth: number;
}

export class UpdateStaffLoanDto extends PartialType(CreateStaffLoanDto) {
  @ApiProperty({ example: 'ACTIVE' })
  @IsString()
  @IsOptional()
  status?: string;
}

export class StaffLoanQueryOptionsDto extends PageOptionsDto {
  @ApiProperty()
  @IsUUID()
  @IsOptional()
  readonly staffId?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly status?: string;
}

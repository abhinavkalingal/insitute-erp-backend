import { PageOptionsDto } from '@core/utils/pagination/page-options.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class IssueIdCardDto {
  @ApiProperty({ example: 'uuid-of-template' })
  @IsUUID()
  @IsNotEmpty()
  templateId: string;

  @ApiPropertyOptional({ example: 'uuid-of-student' })
  @IsUUID()
  @IsOptional()
  studentId?: string;

  @ApiPropertyOptional({ example: 'uuid-of-staff' })
  @IsUUID()
  @IsOptional()
  staffId?: string;

  @ApiPropertyOptional({ example: 'John Visitor' })
  @IsString()
  @IsOptional()
  holderName?: string;

  @ApiPropertyOptional({ example: '2023-12-31T23:59:59Z' })
  @IsDateString()
  @IsOptional()
  validUntil?: string;

  @ApiPropertyOptional({ example: 'BCODE-12345' })
  @IsString()
  @IsOptional()
  barcodeData?: string;
}

export class IssuedIdCardQueryOptionsDto extends PageOptionsDto {
  @ApiPropertyOptional()
  @IsUUID()
  @IsOptional()
  readonly templateId?: string;

  @ApiPropertyOptional()
  @IsUUID()
  @IsOptional()
  readonly studentId?: string;

  @ApiPropertyOptional()
  @IsUUID()
  @IsOptional()
  readonly staffId?: string;
}

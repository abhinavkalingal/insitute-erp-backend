import { PageOptionsDto } from '@core/utils/pagination/page-options.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class IssueCertificateDto {
  @ApiProperty({ example: 'uuid-of-template' })
  @IsUUID()
  @IsNotEmpty()
  templateId: string;

  @ApiProperty({ example: 'uuid-of-student' })
  @IsUUID()
  @IsNotEmpty()
  studentId: string;
}

export class IssuedCertificateQueryOptionsDto extends PageOptionsDto {
  @ApiPropertyOptional()
  @IsUUID()
  @IsOptional()
  readonly templateId?: string;

  @ApiPropertyOptional()
  @IsUUID()
  @IsOptional()
  readonly studentId?: string;
}

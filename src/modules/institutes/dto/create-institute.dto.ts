import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateInstituteDto {
  @ApiProperty({ example: 'Global Academy' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiPropertyOptional({ example: 'global-academy.com' })
  @IsString()
  @IsOptional()
  domain?: string;

  @ApiPropertyOptional({ example: 'postgresql://postgres:password@localhost:5432/tenant_db' })
  @IsString()
  @IsOptional()
  databaseUrl?: string;

  @ApiPropertyOptional({ example: true })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @ApiPropertyOptional({ description: 'Institute profile information (address, phone, etc)' })
  @IsOptional()
  profile?: Record<string, any>;

  @ApiPropertyOptional({ description: 'Institute settings (timezone, theme, etc)' })
  @IsOptional()
  settings?: Record<string, any>;
}

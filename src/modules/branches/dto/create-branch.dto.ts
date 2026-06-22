import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateBranchDto {
  @ApiProperty({ example: 'Main Campus' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiPropertyOptional({
    description: 'Branch address information (line1, city, state, zip, country)'})
  @IsOptional()
  address?: Record<string, any>;

  @ApiPropertyOptional({ description: 'Branch settings (timezone, contactEmail, phone)' })
  @IsOptional()
  settings?: Record<string, any>;


  }

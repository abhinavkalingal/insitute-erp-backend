import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class LinkGuardianDto {
  @ApiPropertyOptional({ description: 'If linking an existing guardian, provide their ID' })
  @IsString()
  @IsOptional()
  guardianId?: string;

  // New Guardian User Fields
  @ApiPropertyOptional({ example: 'parent@home.com' })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({ example: 'password123' })
  @IsString()
  @MinLength(6)
  @IsOptional()
  password?: string;

  @ApiPropertyOptional({ example: 'Robert' })
  @IsString()
  @IsOptional()
  firstName?: string;

  @ApiPropertyOptional({ example: 'Doe' })
  @IsString()
  @IsOptional()
  lastName?: string;

  // Guardian Profile Fields
  @ApiPropertyOptional({
    description: 'Guardian profile information (e.g. occupation, income, secondary phone)'})
  @IsOptional()
  profile?: Record<string, any>;

  // Junction fields
  @ApiProperty({ example: 'FATHER' })
  @IsString()
  @IsNotEmpty()
  relationship: string;

  @ApiPropertyOptional({ example: true })
  @IsBoolean()
  @IsOptional()
  isPrimary?: boolean;
}

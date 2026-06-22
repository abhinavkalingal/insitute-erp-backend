import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class AssignPlanFeatureDto {
  @ApiProperty({ example: 'uuid-of-feature' })
  @IsUUID()
  @IsNotEmpty()
  featureId: string;

  @ApiPropertyOptional({ example: true, description: 'Used for BOOLEAN type features' })
  @IsBoolean()
  @IsOptional()
  isEnabled?: boolean;

  @ApiPropertyOptional({
    example: 5,
    description: 'Used for LIMIT type features. -1 for unlimited'})
  @IsInt()
  @IsOptional()
  limitValue?: number;
}

export class UpdatePlanFeatureDto {
  @ApiPropertyOptional({ example: true })
  @IsBoolean()
  @IsOptional()
  isEnabled?: boolean;

  @ApiPropertyOptional({ example: 10 })
  @IsInt()
  @IsOptional()
  limitValue?: number;
}

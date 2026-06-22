import { PageOptionsDto } from '@core/utils/pagination/page-options.dto';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateGradeRuleDto {
  @ApiProperty({ example: 'A+' })
  @IsString()
  @IsNotEmpty()
  gradeName: string;

  @ApiProperty({ example: 90.0 })
  @IsNumber()
  @Min(0)
  @Max(100)
  minPercent: number;

  @ApiProperty({ example: 100.0 })
  @IsNumber()
  @Min(0)
  @Max(100)
  maxPercent: number;

  @ApiProperty({ example: 4.0 })
  @IsNumber()
  @Min(0)
  gradePoint: number;
}

export class UpdateGradeRuleDto extends PartialType(CreateGradeRuleDto) {}

export class GradeRuleQueryOptionsDto extends PageOptionsDto {}

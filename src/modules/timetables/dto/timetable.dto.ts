import { PageOptionsDto } from '@core/utils/pagination/page-options.dto';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min,
  ValidateNested} from 'class-validator';

export class TimetablePeriodDto {
  @ApiProperty({ example: 1, description: 'Day of week (1=Mon, 7=Sun)' })
  @IsInt()
  @Min(1)
  @Max(7)
  dayOfWeek: number;

  @ApiProperty({ example: '09:00', description: 'Start time in HH:mm format' })
  @IsString()
  @IsNotEmpty()
  startTime: string;

  @ApiProperty({ example: '10:00', description: 'End time in HH:mm format' })
  @IsString()
  @IsNotEmpty()
  endTime: string;

  @ApiProperty({ example: 'uuid-of-subject' })
  @IsUUID()
  @IsNotEmpty()
  subjectId: string;

  @ApiPropertyOptional({ example: 'uuid-of-staff' })
  @IsUUID()
  @IsOptional()
  teacherId?: string;

  @ApiPropertyOptional({ example: 'uuid-of-room' })
  @IsUUID()
  @IsOptional()
  roomId?: string;
}

export class CreateTimetableDto {
  @ApiProperty({ example: 'uuid-of-batch' })
  @IsUUID()
  @IsNotEmpty()
  batchId: string;

  @ApiProperty({ example: 'Fall 2023 Schedule' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ example: true })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @ApiProperty({ type: [TimetablePeriodDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TimetablePeriodDto)
  periods: TimetablePeriodDto[];
}

export class UpdateTimetableDto extends PartialType(CreateTimetableDto) {}

export class TimetableQueryOptionsDto extends PageOptionsDto {
  @ApiPropertyOptional({ description: 'Filter by batch ID' })
  @IsUUID()
  @IsOptional()
  readonly batchId?: string;

  @ApiPropertyOptional({ description: 'Filter by active status' })
  @IsString()
  @IsOptional()
  readonly isActive?: string;
}

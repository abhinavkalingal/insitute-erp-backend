import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  ValidateNested} from 'class-validator';

export enum AttendanceType {
  STUDENT = 'STUDENT',
  STAFF = 'STAFF'}

export enum AttendanceStatus {
  PRESENT = 'PRESENT',
  ABSENT = 'ABSENT',
  LATE = 'LATE',
  HALF_DAY = 'HALF_DAY',
  EXCUSED = 'EXCUSED'}

export class AttendanceRecordDto {
  @ApiPropertyOptional({ description: 'ID of the student (if type=STUDENT)' })
  @IsUUID()
  @IsOptional()
  studentId?: string;

  @ApiPropertyOptional({ description: 'ID of the staff (if type=STAFF)' })
  @IsUUID()
  @IsOptional()
  staffId?: string;

  @ApiProperty({ enum: AttendanceStatus })
  @IsEnum(AttendanceStatus)
  status: string;

  @ApiPropertyOptional({ example: 'Traffic' })
  @IsString()
  @IsOptional()
  remarks?: string;
}

export class MarkAttendanceDto {
  @ApiProperty({
    example: '2023-10-15T00:00:00Z',
    description: 'Date of attendance. Time portion will be ignored.'})
  @IsDateString()
  @IsNotEmpty()
  date: string;

  @ApiProperty({ enum: AttendanceType })
  @IsEnum(AttendanceType)
  type: string;

  @ApiPropertyOptional({ description: 'Required if type is STUDENT' })
  @IsUUID()
  @IsOptional()
  batchId?: string;

  @ApiPropertyOptional({ description: 'Optional department/branch filter for STAFF' })
  @IsUUID()
  @IsOptional()
  branchId?: string;

  @ApiProperty({ type: [AttendanceRecordDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AttendanceRecordDto)
  records: AttendanceRecordDto[];
}

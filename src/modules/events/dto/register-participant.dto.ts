import { PageOptionsDto } from '@core/utils/pagination/page-options.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class RegisterParticipantDto {
  @ApiProperty({ example: 'uuid-of-event' })
  @IsUUID()
  @IsNotEmpty()
  eventId: string;

  @ApiPropertyOptional({ example: 'uuid-of-student' })
  @IsUUID()
  @IsOptional()
  studentId?: string;

  @ApiPropertyOptional({ example: 'uuid-of-staff' })
  @IsUUID()
  @IsOptional()
  staffId?: string;

  @ApiPropertyOptional({ example: 'Guest Bob' })
  @IsString()
  @IsOptional()
  guestName?: string;

  @ApiPropertyOptional({ example: 'bob@example.com' })
  @IsEmail()
  @IsOptional()
  guestEmail?: string;
}

export class ParticipantQueryOptionsDto extends PageOptionsDto {
  @ApiPropertyOptional()
  @IsUUID()
  @IsOptional()
  readonly eventId?: string;
}

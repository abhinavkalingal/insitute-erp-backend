import { PageOptionsDto } from '@core/utils/pagination/page-options.dto';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateEventCategoryDto {
  @ApiProperty({ example: 'Workshop' })
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class UpdateEventCategoryDto extends PartialType(CreateEventCategoryDto) {}

export class EventCategoryQueryOptionsDto extends PageOptionsDto {}

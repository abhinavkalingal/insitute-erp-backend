import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SearchQueryDto {
  @ApiProperty({ description: 'The search query string (minimum 2 characters)' })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  q: string;
}

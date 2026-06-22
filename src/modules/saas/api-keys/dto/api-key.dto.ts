import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateApiKeyDto {
  @ApiProperty({ example: 'Zapier Integration' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ example: 30, description: 'Number of days until the key expires' })
  @IsNumber()
  @Min(1)
  @IsOptional()
  expiresInDays?: number;
}

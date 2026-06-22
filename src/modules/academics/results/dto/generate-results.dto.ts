import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class GenerateResultsDto {
  @ApiProperty({ example: 'uuid-of-exam-term' })
  @IsUUID()
  @IsNotEmpty()
  examTermId: string;
}

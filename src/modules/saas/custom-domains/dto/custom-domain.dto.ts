import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class RegisterCustomDomainDto {
  @ApiProperty({ example: 'erp.stmarys.edu' })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2})+$/, {
    message: 'Must be a valid domain name'})
  domain: string;
}

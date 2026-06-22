import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateWebhookEndpointDto {
  @ApiProperty({ example: 'https://api.my-crm.com/webhooks/erp' })
  @IsUrl({ require_tld: false })
  @IsNotEmpty()
  url: string;

  @ApiPropertyOptional({ example: 'Production CRM Integration' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    example: ['student.created', 'invoice.paid'],
    description: 'Array of event types to subscribe to. Use ["*"] for all events.'})
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  events: string[];
}

import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsHexColor, IsOptional, IsString, IsUrl } from 'class-validator';

export class UpdateInstituteBrandingDto {
  @ApiPropertyOptional()
  @IsUrl()
  @IsOptional()
  logoUrl?: string;

  @ApiPropertyOptional()
  @IsUrl()
  @IsOptional()
  faviconUrl?: string;

  @ApiPropertyOptional({ example: '#2563EB' })
  @IsHexColor()
  @IsOptional()
  primaryColor?: string;

  @ApiPropertyOptional({ example: '#1E40AF' })
  @IsHexColor()
  @IsOptional()
  secondaryColor?: string;

  @ApiPropertyOptional()
  @IsHexColor()
  @IsOptional()
  accentColor?: string;

  @ApiPropertyOptional({ example: 'Inter, sans-serif' })
  @IsString()
  @IsOptional()
  fontFamily?: string;

  @ApiPropertyOptional()
  @IsUrl()
  @IsOptional()
  loginBackgroundUrl?: string;

  @ApiPropertyOptional({ example: 'split' })
  @IsString()
  @IsOptional()
  loginLayout?: string;

  @ApiPropertyOptional()
  @IsUrl()
  @IsOptional()
  emailHeaderUrl?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  emailFooterText?: string;

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  hideSaasBranding?: boolean;
}

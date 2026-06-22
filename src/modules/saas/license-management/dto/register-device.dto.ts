import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RegisterDeviceDto {
  @ApiProperty({ example: 'a1b2c3d4-fingerprint' })
  @IsString()
  @IsNotEmpty()
  deviceIdentifier: string;

  @ApiProperty({ example: 'Chrome on Windows 11' })
  @IsString()
  @IsNotEmpty()
  deviceName: string;
}

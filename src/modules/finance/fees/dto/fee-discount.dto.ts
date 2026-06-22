import { PageOptionsDto } from '@core/utils/pagination/page-options.dto';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export enum DiscountType {
  PERCENTAGE = 'PERCENTAGE',
  FIXED = 'FIXED'}

export class CreateFeeDiscountDto {
  @ApiProperty({ example: 'Sibling Discount' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ enum: DiscountType, example: DiscountType.PERCENTAGE })
  @IsEnum(DiscountType)
  @IsNotEmpty()
  type: string;

  @ApiProperty({ example: 10 })
  @IsNumber()
  @Min(0)
  value: number;
}

export class UpdateFeeDiscountDto extends PartialType(CreateFeeDiscountDto) {}

export class FeeDiscountQueryOptionsDto extends PageOptionsDto {}

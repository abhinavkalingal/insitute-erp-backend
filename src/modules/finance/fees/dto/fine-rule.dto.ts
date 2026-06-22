import { PageOptionsDto } from '@core/utils/pagination/page-options.dto';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEnum, IsInt, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export enum FineAmountType {
  FIXED = 'FIXED',
  PERCENTAGE_PER_DAY = 'PERCENTAGE_PER_DAY'}

export class CreateFineRuleDto {
  @ApiProperty({ example: 'Standard Late Penalty' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ enum: FineAmountType, example: FineAmountType.FIXED })
  @IsEnum(FineAmountType)
  @IsNotEmpty()
  amountType: string;

  @ApiProperty({ example: 50 })
  @IsNumber()
  @Min(0)
  amount: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  @Min(1)
  daysAfterDueDate: number;
}

export class UpdateFineRuleDto extends PartialType(CreateFineRuleDto) {}

export class FineRuleQueryOptionsDto extends PageOptionsDto {}

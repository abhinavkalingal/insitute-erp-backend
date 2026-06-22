import { RequirePermissions } from '@core/decorators/permissions.decorator';
import { PermissionsGuard } from '@core/guards/permissions.guard';
import { ApiPaginatedResponse } from '@core/utils/pagination/api-paginated-response.decorator';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import {
  CreateFineRuleDto,
  FineRuleQueryOptionsDto,
  UpdateFineRuleDto} from '../../dto/fine-rule.dto';
import { FineRulesService } from '../../services/fine-rules/fine-rules.service';

@ApiTags('Finance / Fine Rules')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), PermissionsGuard)
@Controller('fine-rules')
export class FineRulesController {
  constructor(private readonly fineRulesService: FineRulesService) {}

  @Post()
  @RequirePermissions('create:finance')
  @ApiOperation({ summary: 'Create a new fine rule' })
  create( @Body() createDto: CreateFineRuleDto) {
    return this.fineRulesService.create( createDto);
  }

  @Get()
  @RequirePermissions('read:finance')
  @ApiOperation({ summary: 'Get all fine rules' })
  @ApiPaginatedResponse(CreateFineRuleDto)
  findAll( @Query() queryOptions: FineRuleQueryOptionsDto) {
    return this.fineRulesService.findAll( queryOptions);
  }

  @Get(':id')
  @RequirePermissions('read:finance')
  @ApiOperation({ summary: 'Get a specific fine rule by ID' })
  findOne( @Param('id') id: string) {
    return this.fineRulesService.findOne(id, );
  }

  @Patch(':id')
  @RequirePermissions('update:finance')
  @ApiOperation({ summary: 'Update a fine rule' })
  update(
    
    @Param('id') id: string,
    @Body() updateDto: UpdateFineRuleDto,
  ) {
    return this.fineRulesService.update(id,  updateDto);
  }

  @Delete(':id')
  @RequirePermissions('delete:finance')
  @ApiOperation({ summary: 'Delete a fine rule' })
  remove( @Param('id') id: string) {
    return this.fineRulesService.remove(id, );
  }
}

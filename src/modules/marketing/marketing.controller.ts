import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MarketingService } from './marketing.service';
import { Prisma } from '@prisma/client';

@Controller('marketing')
export class MarketingController {
  constructor(private readonly marketingService: MarketingService) {}

  @Post('campaigns')
  createCampaign(@Body() data: Prisma.CampaignCreateInput) {
    return this.marketingService.createCampaign(data);
  }

  @Get('campaigns')
  getCampaigns() {
    return this.marketingService.getCampaigns();
  }

  @Patch('campaigns/:id')
  updateCampaign(@Param('id') id: string, @Body() data: Prisma.CampaignUpdateInput) {
    return this.marketingService.updateCampaign(id, data);
  }

  @Delete('campaigns/:id')
  deleteCampaign(@Param('id') id: string) {
    return this.marketingService.deleteCampaign(id);
  }

  @Post('leads')
  createLead(@Body() data: Prisma.LeadCreateInput) {
    return this.marketingService.createLead(data);
  }

  @Get('leads')
  getLeads() {
    return this.marketingService.getLeads();
  }

  @Patch('leads/:id')
  updateLead(@Param('id') id: string, @Body() data: Prisma.LeadUpdateInput) {
    return this.marketingService.updateLead(id, data);
  }
}

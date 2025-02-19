import { Body, Controller, Delete, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { VipService } from '../services/vip.service';
import { xVip_logs, xVip_vips } from '@prisma/client';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

// @UseGuards(JwtAuthGuard, RolesGuard)
@Controller('vip')
export class VipController {
  constructor(private readonly vipService: VipService) {}

  @Get()
  async getVipList(): Promise<xVip_vips[]> {
    return this.vipService.getVipList();
  }

  @Get('logs')
  async getLogs(): Promise<xVip_logs[]> {
    return this.vipService.getLogs();
  }
  
  @Post()
  async createVip(@Body() vipData: xVip_vips): Promise<xVip_vips> {
    return this.vipService.createVip(vipData);
  }

  @Post('logs')
  async createLog(@Body() logData: xVip_logs): Promise<xVip_logs> {
    return this.vipService.createLog(logData);
  }

  @Patch()
  async updateVip(@Body() vipData: xVip_vips): Promise<xVip_vips> {
    return this.vipService.updateVip(vipData);
  }

  @Delete()
  async deleteVip(@Body() vipData: xVip_vips): Promise<xVip_vips> {
    return this.vipService.deleteVip(vipData);
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { VipService } from './vip.service';
import { xVip_logs, xVip_vips } from '@prisma/client';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('vip')
export class VipController {
  constructor(private readonly vipService: VipService) {}

  @Get()
  async getVipList(): Promise<xVip_vips[]> {
    return await this.vipService.getVipList();
  }

  @Get('logs')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'owner')
  async getLogs(): Promise<xVip_logs[]> {
    return await this.vipService.getLogs();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'owner')
  @Post()
  async createVip(@Body() vipData: xVip_vips): Promise<xVip_vips> {
    return await this.vipService.createVip(vipData);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'owner')
  @Post()
  @Post('logs')
  async createLog(@Body() logData: xVip_logs): Promise<xVip_logs> {
    return await this.vipService.createLog(logData);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'owner')
  @Post()
  @Patch()
  async updateVip(@Body() vipData: xVip_vips): Promise<xVip_vips> {
    return await this.vipService.updateVip(vipData);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'owner')
  @Post()
  @Delete()
  async deleteVip(@Body() vipData: xVip_vips): Promise<xVip_vips> {
    return await this.vipService.deleteVip(vipData);
  }
}

import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { AdminService } from './admin.service';
import { xVip_web_admins } from '@prisma/client';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('owner')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get()
  async getAdmins(): Promise<xVip_web_admins[]> {
    return await this.adminService.getAdmins();
  }

  @Get(':id')
  async getAdmin(@Param() params: any): Promise<xVip_web_admins> {
    return this.adminService.getAdmin(params.id);
  }

  @Post()
  async createAdmin(@Body() admin): Promise<xVip_web_admins> {
    return this.adminService.createAdmin(admin);
  }
}

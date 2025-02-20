import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { xVip_web_admins } from '@prisma/client';
import { PrismaService } from 'src/prisma/services/prisma.service';

@Injectable()
export class AdminService {
  constructor(private prismaService: PrismaService) {}

  async getAdmins(): Promise<xVip_web_admins[]> {
    return await this.prismaService.xVip_web_admins.findMany();
  }

  async getAdmin(steamid: any): Promise<xVip_web_admins> {
    const admin = await this.prismaService.xVip_web_admins.findUnique({
      where: {
        steamid: steamid,
      },
    });
    if (!admin) {
      throw new NotFoundException('admin not found');
    }
    return admin;
  }

  async createAdmin(admin: any): Promise<xVip_web_admins> {
    const existingAdmin = await this.prismaService.xVip_web_admins.findUnique({
      where: {
        steamid: admin.steamid,
      },
    });
    if (existingAdmin) {
      throw new ConflictException('admin already exists');
    }
    return await this.prismaService.xVip_web_admins.create({
      data: admin,
    });
  }
}

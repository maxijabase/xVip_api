import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/services/prisma.service';
import { xVip_logs, xVip_vips } from '@prisma/client';

@Injectable()
export class VipService {
  constructor(private prisma: PrismaService) {}

  async getVipList(): Promise<xVip_vips[]> {
    return this.prisma.xVip_vips.findMany();
  }

  async getLogs(): Promise<xVip_logs[]> {
    return this.prisma.xVip_logs.findMany({
      orderBy: {
        timestamp: 'desc',
      },
    });
  }

  async createVip(vip: xVip_vips): Promise<xVip_vips> {
    const existingVip = await this.prisma.xVip_vips.findUnique({
      where: {
        steamid: vip.steamid,
      },
    });

    if (existingVip) {
      throw new HttpException(
        `vip already exists for ${vip.steamid}`,
        HttpStatus.CONFLICT,
      );
    }

    return this.prisma.xVip_vips.create({ data: vip });
  }

  async createLog(log: xVip_logs): Promise<xVip_logs> {
    try {
      return this.prisma.xVip_logs.create({ data: log });
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateVip(vip: xVip_vips): Promise<xVip_vips> {
    const existingVip = await this.prisma.xVip_vips.findUnique({
      where: {
        steamid: vip.steamid,
      },
    });

    if (!existingVip) {
      throw new HttpException(
        `vip does not exist for ${vip.steamid}`,
        HttpStatus.NOT_FOUND,
      );
    }

    return this.prisma.xVip_vips.update({
      where: {
        steamid: vip.steamid,
      },
      data: vip,
    });
  }

  async deleteVip(vip: xVip_vips): Promise<xVip_vips> {
    const existingVip = await this.prisma.xVip_vips.findUnique({
      where: {
        steamid: vip.steamid,
      },
    });

    if (!existingVip) {
      throw new HttpException(
        `vip does not exist for ${vip.steamid}`,
        HttpStatus.NOT_FOUND,
      );
    }

    return this.prisma.xVip_vips.delete({
      where: {
        steamid: vip.steamid,
      },
    });
  }
}

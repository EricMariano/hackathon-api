import { Injectable, ConflictException, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/common/prisma/prisma.service";
import { CreateSuperadminDto } from "./dto/create-superadmin.dto";
import { UpdateSuperadminDto } from "./dto/update-superadmin.sto";
import * as bcrypt from "bcrypt"

@Injectable()
export class SuperadminService {
  constructor(private readonly prisma: PrismaService) {}

  async createSuperadmin(createSuperadminDto: CreateSuperadminDto) {
    const verifyExistenceEmailPhone = await this.prisma.superadmin.findFirst({
      where: {
        OR: [{ email: createSuperadminDto.email}, {phone: createSuperadminDto.phone}]
      }
    });
    if (verifyExistenceEmailPhone) {
      throw new ConflictException('Already used Email or Phone');
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(createSuperadminDto.password, saltRounds);

    return this.prisma.superadmin.create({
      data: {
        firstName: createSuperadminDto.firstName,
        lastName: createSuperadminDto.lastName,
        phone: createSuperadminDto.phone,
        email: createSuperadminDto.email,
        password: hashedPassword,
      }
    });
  }

  async findAllSuperadmins() {
    return this.prisma.superadmin.findMany ({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        phone: true,
        email: true,
        createdAt: true,
      }
    })
  }

  async findOneSuperadmin(id: string) {
    const superadmin = this.prisma.superadmin.findUnique ({
      where: {id},
      select: {
        id: true,
        firstName: true,
        lastName: true,
        phone: true,
        email: true,
        createdAt: true,
      }
    });
    if (!superadmin) {
      throw new NotFoundException(`Cannot find superadmin id (${id})`)
    }
  }

  async updateSuperadmin(id: string, updateSuperadminDto: UpdateSuperadminDto) {
    await this.findOneSuperadmin
    return this.prisma.superadmin.update({
      where: {id},
      data: updateSuperadminDto,
    });
  }

  async deleteSuperadmin(id: string) {
    await this.findOneSuperadmin
    return this.prisma.superadmin.delete({
      where: {id}
    })
  }
}
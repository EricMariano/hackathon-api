import { Injectable, ConflictException, NotFoundException  } from "@nestjs/common";
import { PrismaService } from "src/common/prisma/prisma.service";
import { CreateOrgDto } from "./dto/create-org.dto";
import { UpdateOrgDto } from "./dto/update-org.dto";
@Injectable()
export class OrganizationService {
  constructor(private readonly prisma: PrismaService) {}

  async createOrg(createOrgDto: CreateOrgDto) {
    const superadminExists = await this.prisma.superadmin.findUnique({
      where: { id: createOrgDto.superadminId },
    });
    if (!superadminExists) {
      throw new NotFoundException('Superadmin não encontrado');
    }

    const existingEmail = await this.prisma.organization.findFirst({
      where: { email: createOrgDto.email },
    });
    if (existingEmail) {
      throw new ConflictException('Email já utilizado por outra organização');
    }
    return this.prisma.organization.create({
      data: {
        name: createOrgDto.name,
        description: createOrgDto.description,
        email: createOrgDto.email,
        website: createOrgDto.website,
        superadminId: createOrgDto.superadminId,
      }
    })
  }

  async findAllOrgs() {
    return this.prisma.organization.findMany ({
      select: {
        id: true,
        name: true,
        email: true,
        superadminId: true,
        createdAt: true,
      }
    })
  }

  async findOneOrg(id: string) {
    const organization = await this.prisma.organization.findUnique({
      where: {id},
        select: {
          id: true,
          name: true,
          email: true,
          superadminId: true,
          createdAt: true,
        }
    })
    if (!organization) {
      throw new NotFoundException(`Cannot find org id (${id})`)
    }
    return organization;
  }

  async updateOrg(id: string, updateOrgDto: UpdateOrgDto) {
    await this.findOneOrg(id)
    return this.prisma.organization.update({
      where: {id},
      data: updateOrgDto,
    });
  }

  async removeOrg(id: string) {
    await this.findOneOrg(id)
    return this.prisma.organization.delete({
      where: {id}
    });
  }
}
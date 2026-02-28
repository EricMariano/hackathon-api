import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateSquadDto } from './dto/create-squad.dto';
import { JoinSquadDto } from './dto/join-squad.dto';
import { UpdateSquadDto } from './dto/update-squad.dto';

@Injectable()
export class SquadsService {
  constructor(private readonly prisma: PrismaService) {}

  async createSquad(createSquadDto: CreateSquadDto) {
    const event = await this.prisma.event.findUnique({
      where: { id: createSquadDto.eventId },
    });
    if (!event) {
      throw new NotFoundException(`Event not found (${createSquadDto.eventId})`);
    }

    const creatorId = createSquadDto.createdBy;
    const creator = await this.prisma.user.findUnique({
      where: { id: creatorId },
    });
    if (!creator) {
      throw new NotFoundException(`User not found (${creatorId})`);
    }

    const existingSquad = await this.prisma.squad.findFirst({
      where: {
        eventId: createSquadDto.eventId,
        name: createSquadDto.name,
      },
    });
    if (existingSquad) {
      throw new ConflictException(
        'Squad with this name already exists for this event',
      );
    }

    const squad = await this.prisma.squad.create({
      data: {
        name: createSquadDto.name,
        description: createSquadDto.description ?? '',
        passkey: createSquadDto.passkey?.trim() || undefined,
        eventId: createSquadDto.eventId,
        userId: creatorId,
        membersQuantity: createSquadDto.membersQuantity,
      },
    });

    const memberIds = [
      ...new Set([creatorId, ...(createSquadDto.members ?? [])]),
    ];
    const toLink = memberIds.slice(0, createSquadDto.membersQuantity);

    if (toLink.length) {
      await this.prisma.user.updateMany({
        where: { id: { in: toLink } },
        data: { squadId: squad.id },
      });
    }

    return this.findOneSquad(squad.id);
  }

  async findAllSquads() {
    return this.prisma.squad.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        eventId: true,
        userId: true,
        membersQuantity: true,
        createdAt: true,
        event: {
          select: {
            id: true,
            name: true,
          },
        },
        createdBy: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });
  }

  async findOneSquad(id: string) {
    const squad = await this.prisma.squad.findUnique({
      where: { id },
      include: {
        event: true,
        createdBy: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        members: true,
      },
    });
    if (!squad) {
      throw new NotFoundException(`Squad not found (${id})`);
    }
    return squad;
  }

  async updateSquad(id: string, updateSquadDto: UpdateSquadDto) {
    await this.findOneSquad(id);
    return this.prisma.squad.update({
      where: { id },
      data: updateSquadDto,
    });
  }

  async removeSquad(id: string) {
    await this.findOneSquad(id);
    await this.prisma.user.updateMany({
      where: { squadId: id },
      data: { squadId: null },
    });
    return this.prisma.squad.delete({
      where: { id },
    });
  }

  async joinSquad(squadId: string, joinSquadDto: JoinSquadDto) {
    const squad = await this.prisma.squad.findUnique({
      where: { id: squadId },
      include: { members: true },
    });
    if (!squad) {
      throw new NotFoundException(`Squad not found (${squadId})`);
    }

    const user = await this.prisma.user.findUnique({
      where: { id: joinSquadDto.userId },
    });
    if (!user) {
      throw new NotFoundException(`User not found (${joinSquadDto.userId})`);
    }

    if (user.squadId) {
      throw new BadRequestException(
        'User is already in a squad. Leave the current squad first.',
      );
    }

    if (squad.members.length >= squad.membersQuantity) {
      throw new BadRequestException('Squad is full.');
    }

    if (squad.passkey) {
      const providedPasskey = joinSquadDto.passkey?.trim();
      if (!providedPasskey || providedPasskey !== squad.passkey) {
        throw new BadRequestException('Invalid or missing passkey.');
      }
    }

    await this.prisma.user.update({
      where: { id: joinSquadDto.userId },
      data: { squadId },
    });

    return this.findOneSquad(squadId);
  }

  async leaveSquad(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { squad: true },
    });
    if (!user) {
      throw new NotFoundException(`User not found (${userId})`);
    }
    if (!user.squadId) {
      throw new BadRequestException('User is not in any squad.');
    }

    await this.prisma.user.update({
      where: { id: userId },
      data: { squadId: null },
    });

    return this.findOneSquad(user.squadId);
  }
}

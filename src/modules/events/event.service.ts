import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventService {
  private readonly frontendUrl: string;

  constructor(private readonly prisma: PrismaService) {
    this.frontendUrl =
      process.env.FRONTEND_URL ?? process.env.APP_URL ?? 'http://localhost:3000';
  }

  
    // shared link to enter the event.
    // Format: {FRONTEND_URL}/events/{eventId}
  getShareableEventLink(eventId: string): string {
    const base = this.frontendUrl.replace(/\/$/, '');
    return `${base}/events/${eventId}`;
  }

  async createEvent(createEventDto: CreateEventDto) {
    const existingEvent = await this.prisma.event.findFirst({
      where: {
        name: createEventDto.name,
        superadminId: createEventDto.superadminId,
      },
    });
    if (existingEvent) {
      throw new ConflictException('Event with this name already exists for this superadmin');
    }

    const event = await this.prisma.event.create({
      data: {
        name: createEventDto.name,
        description: createEventDto.description,
        startDate: createEventDto.startDate,
        endDate: createEventDto.endDate,
        location: createEventDto.location,
        categoryBadges: createEventDto.categoryBadges,
        eventLink: createEventDto.eventLink ?? '',
        organizationId: createEventDto.organizationId || undefined,
        superadminId: createEventDto.superadminId,
      },
    });

    const shareableLink = this.getShareableEventLink(event.id);
    return this.prisma.event.update({
      where: { id: event.id },
      data: { eventLink: shareableLink },
    });
  }

  async findAllEvents() {
    return this.prisma.event.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        startDate: true,
        endDate: true,
        location: true,
        categoryBadges: true,
        eventLink: true,
        createdAt: true,
        organizationId: true,
        superadminId: true,
      },
    });
  }

  async findOneEvent(id: string) {
    const event = await this.prisma.event.findUnique({
      where: { id },
      include: {
        organization: true,
        superadmin: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        squads: true,
      },
    });
    if (!event) {
      throw new NotFoundException(`Event not found (${id})`);
    }
    return event;
  }

  async updateEvent(id: string, updateEventDto: UpdateEventDto) {
    await this.findOneEvent(id);
    const { squads: _squads, ...eventData } = updateEventDto;
    return this.prisma.event.update({
      where: { id },
      data: eventData,
    });
  }

  async removeEvent(id: string) {
    await this.findOneEvent(id);
    return this.prisma.event.delete({
      where: { id },
    });
  }
}
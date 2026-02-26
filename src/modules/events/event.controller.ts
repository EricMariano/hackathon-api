import { Controller, Post, Get, Put, Delete, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@ApiTags('events')
@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  @ApiOperation({ summary: 'Criar evento' })
  createEvent(@Body() createEventDto: CreateEventDto) {
    return this.eventService.createEvent(createEventDto);
  }

  @Get('shareable-link/:id')
  @ApiOperation({ summary: 'Obter link compartilhável do evento' })
  async getShareableEventLink(@Param('id') id: string) {
    await this.eventService.findOneEvent(id);
    const link = this.eventService.getShareableEventLink(id);
    return { link };
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os eventos' })
  findAllEvents() {
    return this.eventService.findAllEvents();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar evento por ID' })
  findOneEvent(@Param('id') id: string) {
    return this.eventService.findOneEvent(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar evento' })
  updateEvent(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventService.updateEvent(id, updateEventDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover evento' })
  removeEvent(@Param('id') id: string) {
    return this.eventService.removeEvent(id);
  }
}
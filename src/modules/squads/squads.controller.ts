import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { SquadsService } from './squads.service';
import { CreateSquadDto } from './dto/create-squad.dto';
import { JoinSquadDto } from './dto/join-squad.dto';
import { LeaveSquadDto } from './dto/leave-squad.dto';
import { UpdateSquadDto } from './dto/update-squad.dto';

@ApiTags('squads')
@Controller('squads')
export class SquadsController {
  constructor(private readonly squadsService: SquadsService) {}

  @Post()
  @ApiOperation({ summary: 'Criar squad' })
  createSquad(@Body() createSquadDto: CreateSquadDto) {
    return this.squadsService.createSquad(createSquadDto);
  }

  @Post('leave')
  @ApiOperation({ summary: 'Sair do squad' })
  leaveSquad(@Body() leaveSquadDto: LeaveSquadDto) {
    return this.squadsService.leaveSquad(leaveSquadDto.userId);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os squads' })
  findAllSquads() {
    return this.squadsService.findAllSquads();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar squad por ID' })
  findOneSquad(@Param('id') id: string) {
    return this.squadsService.findOneSquad(id);
  }

  @Post(':id/join')
  @ApiOperation({ summary: 'Entrar no squad' })
  joinSquad(@Param('id') id: string, @Body() joinSquadDto: JoinSquadDto) {
    return this.squadsService.joinSquad(id, joinSquadDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar squad' })
  updateSquad(
    @Param('id') id: string,
    @Body() updateSquadDto: UpdateSquadDto,
  ) {
    return this.squadsService.updateSquad(id, updateSquadDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover squad' })
  removeSquad(@Param('id') id: string) {
    return this.squadsService.removeSquad(id);
  }
}

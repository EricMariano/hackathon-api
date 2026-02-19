import { Post, Get, Patch, Delete, Controller, Body, Param } from "@nestjs/common";
import { SuperadminService } from "./superadmin.service";
import { CreateSuperadminDto } from "./dto/create-superadmin.dto";
import { UpdateSuperadminDto } from "./dto/update-superadmin.dto";

@Controller('superadmin')
export class SuperadminController {
  constructor(private readonly superadminServices: SuperadminService) {}

  @Post()
  create(@Body() createSuperadminDto: CreateSuperadminDto) {
    return this.superadminServices.createSuperadmin(createSuperadminDto)
  }

  @Get()
  findAllSuperadmins() {
    return this.superadminServices.findAllSuperadmins()
  }

  @Get(':id')
  findOneSuperadmin(@Param('id') id: string) {
    return this.superadminServices.findOneSuperadmin(id)
  }

  @Patch(':id')
  updateSuperadmin(@Param('id') id: string, @Body() updateSuperadminDto: UpdateSuperadminDto) {
    return this.superadminServices.updateSuperadmin(id, updateSuperadminDto)
  }

  @Delete(':id')
  deleteSuperadmin(@Param('id') id: string) {
    return this.superadminServices.removeSuperadmin(id)
  }
}


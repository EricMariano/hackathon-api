import { Post, Get, Patch, Delete, Controller, Body, Param } from "@nestjs/common";
import { OrganizationService } from "./org.service";
import { CreateOrgDto } from "./dto/create-org.dto";
import { UpdateOrgDto } from "./dto/update-org.dto";

@Controller('organization')
export class OrganizationController {
  constructor(private readonly organizationServices: OrganizationService) {}

  @Post()
  create(@Body() createOrgDto: CreateOrgDto) {
    return this.organizationServices.createOrg(createOrgDto)
  }

  @Get()
  findAllOrganizations() {
    return this.organizationServices.findAllOrgs();
  }

  @Get(':id')
  findOneOrg(@Param('id') id: string) {
    return this.organizationServices.findOneOrg(id)
  }

  @Patch(':id')
  updateOrganization(@Param('id') id: string, @Body() updateOrgDto: UpdateOrgDto) {
    return this.organizationServices.updateOrg(id, updateOrgDto)
  }

  @Delete(':id')
  removeOrganization(@Param('id') id: string) {
    return this.organizationServices.removeOrg(id)
  }
}
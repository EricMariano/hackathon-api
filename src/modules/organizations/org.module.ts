import { Module } from "@nestjs/common";
import { OrganizationService } from "./org.service";
import { OrganizationController } from "./org.controller";
import { PrismaModule } from "src/common/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  controllers: [OrganizationController],
  providers: [OrganizationService],
  exports: [OrganizationModule]
})
export class OrganizationModule {}
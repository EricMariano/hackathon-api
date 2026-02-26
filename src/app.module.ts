import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './common/prisma/prisma.module';
// import { AuthModule } from './auth/auth.module';
import { UsersModule } from './modules/users/users.module'; 
// import { SquadModule } from './squad/squad.module';
import { EventModule } from './modules/events/event.module';
import { SuperadminModule } from './modules/superadmin/superadmin.module'; 
import { OrganizationModule } from './modules/organizations/org.module';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    SuperadminModule,
    EventModule,
    OrganizationModule,
    // SquadModule,
    // AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { PrismaModule } from './prisma/prisma.module';
// import { AuthModule } from './auth/auth.module';
// import { UserModule } from './user/user.module';
// import { SquadModule } from './squad/squad.module';
// import { EventModule } from './event/event.module';
// import { SuperadminModule } from './superadmin/superadmin.module';

@Module({
  imports: [
    // PrismaModule,
    // AuthModule,
    // UserModule,
    // SquadModule,
    // EventModule,
    // SuperadminModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

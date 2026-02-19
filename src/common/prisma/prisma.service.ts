import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '../../../generated/prisma/client.js';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);

  async onModuleInit() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call -- PrismaClient from generated code
    await this.$connect();
  }

  async onModuleDestroy() {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call -- PrismaClient from generated code
      await this.$disconnect();
    } catch (err) {
      this.logger.warn('Prisma disconnect failed (non-fatal)', err);
    }
  }
}

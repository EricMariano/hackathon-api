import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../../../generated/prisma/client.js';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
      throw new Error('DATABASE_URL environment variable is required');
    }
    const adapter = new PrismaPg({ connectionString });
    super({ adapter });
  }

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

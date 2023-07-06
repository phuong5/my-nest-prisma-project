import { Module } from '@nestjs/common';
import { PrismaService } from '../services/prisma.service';
import { UniqueValidator } from 'src/validators/unique-validator.service';

@Module({
  providers: [UniqueValidator, PrismaService],
  exports: [PrismaService],
})
export class SharedModule {}

import { Module } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoiceController } from './invoice.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [InvoiceController],
  providers: [PrismaService, InvoiceService],
})
export class InvoiceModule {}

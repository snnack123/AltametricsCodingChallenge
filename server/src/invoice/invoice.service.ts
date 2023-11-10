import { HttpException, Inject, Injectable } from '@nestjs/common';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { PrismaService } from 'src/prisma.service';
import { UserInfo } from 'src/auth/auth.interface';

@Injectable()
export class InvoiceService {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  async getUserById(id: number) {
    return await this.prismaService.user.findUnique({
      where: { id: id },
    });
  }

  async create(userInfo: UserInfo, createInvoiceDto: CreateInvoiceDto) {
    const user = await this.getUserById(Number(userInfo.id));

    if (!user) {
      throw new HttpException('User not found', 404);
    }

    return this.prismaService.invoice.create({
      data: {
        amount: createInvoiceDto.amount,
        dueDate: createInvoiceDto.dueDate,
        details: createInvoiceDto.details,
        user: { connect: { id: user.id } },
      },
    });
  }

  async findAll(userInfo: UserInfo) {
    const user = await this.getUserById(Number(userInfo.id));

    if (!user) {
      throw new HttpException('User not found', 404);
    }

    return await this.prismaService.invoice.findMany({
      where: {
        user: { id: Number(userInfo.id) },
      },
    });
  }

  async findOne(userInfo: UserInfo, id: number) {
    const user = await this.getUserById(Number(userInfo.id));

    if (!user) {
      throw new HttpException('User not found', 404);
    }

    return await this.prismaService.invoice.findUnique({
      where: { id: id, userId: Number(userInfo.id) },
    });
  }

  async update(
    userInfo: UserInfo,
    id: number,
    updateInvoiceDto: UpdateInvoiceDto,
  ) {
    const user = await this.getUserById(Number(userInfo.id));

    if (!user) {
      throw new HttpException('User not found', 404);
    }
    const invoice = await this.prismaService.invoice.findUnique({
      where: { id: id, userId: Number(userInfo.id) },
    });
    if (!invoice) {
      throw new HttpException('Invoice not found', 404);
    }
    return this.prismaService.invoice.update({
      where: { id: id },
      data: {
        amount: updateInvoiceDto.amount,
        dueDate: updateInvoiceDto.dueDate,
        details: updateInvoiceDto.details,
      },
    });
  }

  async remove(userInfo: UserInfo, id: number) {
    const user = await this.getUserById(Number(userInfo.id));

    if (!user) {
      throw new HttpException('User not found', 404);
    }
    const invoice = await this.prismaService.invoice.findUnique({
      where: { id: id, userId: Number(userInfo.id) },
    });

    if (!invoice) {
      throw new HttpException('Invoice not found', 404);
    }

    return this.prismaService.invoice.delete({
      where: { id: id },
    });
  }
}

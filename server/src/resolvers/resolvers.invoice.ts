import 'reflect-metadata';
import { Inject } from '@nestjs/common';
import {
  Args,
  Context,
  Field,
  InputType,
  Mutation,
  Query,
  ResolveField,
  Resolver,
  Root,
  registerEnumType,
} from '@nestjs/graphql';
import { User } from '@prisma/client';
import { Invoice } from 'src/models/invoice';
import { PrismaService } from 'src/prisma.service';

@InputType()
export class InvoiceCreateInput {
  @Field()
  amount: number;

  @Field()
  dueDate: Date;

  @Field({ nullable: true })
  details: string;
}

@InputType()
export class InvoiceUpdateInput extends InvoiceCreateInput {
  @Field()
  id: number;
}

@InputType()
class InvoiceOrderByUpdatedAtInput {
  @Field((type) => SortOrder)
  updatedAt: SortOrder;
}

enum SortOrder {
  asc = 'asc',
  desc = 'desc',
}

registerEnumType(SortOrder, {
  name: 'SortOrder',
});

@Resolver(Invoice)
export class InvoiceResolver {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  @ResolveField()
  user(@Root() invoice: Invoice): Promise<User | null> {
    return this.prismaService.invoice
      .findUnique({
        where: {
          id: invoice.id,
        },
      })
      .user();
  }

  @Query((returns) => Invoice, { nullable: true })
  invoiceById(@Args('id') id: number) {
    return this.prismaService.invoice.findUnique({
      where: { id },
    });
  }

  @Query((returns) => [Invoice])
  feed(
    @Args('searchString', { nullable: true }) searchString: string,
    @Args('skip', { nullable: true }) skip: number,
    @Args('take', { nullable: true }) take: number,
    @Args('orderBy', { nullable: true }) orderBy: InvoiceOrderByUpdatedAtInput,
    @Context() ctx,
  ) {
    const or = searchString
      ? {
          OR: [{ details: { contains: searchString } }],
        }
      : {};

    return this.prismaService.invoice.findMany({
      where: {
        ...or,
      },
      take: take || undefined,
      skip: skip || undefined,
      orderBy: orderBy || undefined,
    });
  }

  @Mutation((returns) => Invoice)
  createInvoice(
    @Args('data') data: InvoiceCreateInput,
    @Args('userEmail') userEmail: string,
    @Context() ctx,
  ): Promise<Invoice> {
    return this.prismaService.invoice.create({
      data: {
        amount: data.amount,
        dueDate: data.dueDate,
        details: data.details,
        user: {
          connect: { email: userEmail },
        },
      },
    });
  }

  @Mutation((returns) => Invoice)
  updateInvoice(
    @Args('data') data: InvoiceUpdateInput,
    @Context() ctx,
  ): Promise<Invoice> {
    return this.prismaService.invoice.update({
      where: {
        id: data.id,
      },
      data: {
        amount: data.amount,
        dueDate: data.dueDate,
        details: data.details,
      },
    });
  }

  @Mutation((returns) => Invoice, { nullable: true })
  async deleteInvoice(
    @Args('id') id: number,
    @Context() ctx,
  ): Promise<Invoice | null> {
    return this.prismaService.invoice.delete({
      where: {
        id: id,
      },
    });
  }
}

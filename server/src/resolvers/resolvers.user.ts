import 'reflect-metadata';
import {
  Resolver,
  Query,
  Mutation,
  Args,
  Context,
  ResolveField,
  Root,
  InputType,
  Field,
} from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { User } from 'src/models/user';
import { Invoice } from 'src/models/invoice';
import { PrismaService } from '../prisma.service';
import { InvoiceCreateInput } from './resolvers.invoice';
import * as bcrypt from 'bcrypt';

@InputType()
class UserUniqueInput {
  @Field({ nullable: true })
  id: number;

  @Field({ nullable: true })
  email: string;
}

@InputType()
class UserCreateInput {
  @Field()
  email: string;

  @Field()
  password: string;

  @Field({ nullable: true })
  name: string;

  @Field((type) => [InvoiceCreateInput], { nullable: true })
  invoices: [InvoiceCreateInput];
}

@Resolver(User)
export class UserResolver {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  @ResolveField()
  async invoices(@Root() user: User, @Context() ctx): Promise<Invoice[]> {
    return this.prismaService.user
      .findUnique({
        where: {
          id: user.id,
        },
      })
      .invoices();
  }

  @Mutation((returns) => User)
  async signupUser(
    @Args('data') data: UserCreateInput,
    @Context() ctx,
  ): Promise<User> {
    const invoiceData = data.invoices?.map((invoice) => {
      return {
        amount: invoice.amount,
        dueDate: invoice.dueDate,
        details: invoice.details,
      };
    });

    const hashedPassword = await bcrypt.hash(data.password, 10);

    return this.prismaService.user.create({
      data: {
        email: data.email,
        name: data.name,
        password: hashedPassword,
        invoices: {
          create: invoiceData,
        },
      },
    });
  }

  @Query((returns) => [User], { nullable: true })
  async allUsers(@Context() ctx) {
    return this.prismaService.user.findMany();
  }

  @Query((returns) => [Invoice], { nullable: true })
  async invoicesByUser(
    @Args('userUniqueInput') userUniqueInput: UserUniqueInput,
  ): Promise<Invoice[]> {
    return this.prismaService.user
      .findUnique({
        where: {
          id: userUniqueInput.id || undefined,
          email: userUniqueInput.email || undefined,
        },
      })
      .invoices();
  }
}

import 'reflect-metadata';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';
import { Invoice } from './invoice';

@ObjectType()
export class User {
  @Field((type) => Int)
  id: number;

  @Field()
  @IsEmail()
  email: string;

  @Field((type) => String, { nullable: true })
  name?: string | null;

  @Field((type) => String)
  password: string;

  @Field((type) => [Invoice], { nullable: true })
  invoices?: [Invoice] | null;
}

import 'reflect-metadata';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from './user';

@ObjectType()
export class Invoice {
  @Field((type) => Int)
  id: number;

  @Field((type) => Date)
  createdAt: Date;

  @Field((type) => Date)
  updatedAt: Date;

  @Field((type) => Int)
  amount: number;

  @Field((type) => Date)
  dueDate: Date;

  @Field((type) => String, { nullable: true })
  details: string | null;

  @Field((type) => User, { nullable: true })
  user?: User | null;
}

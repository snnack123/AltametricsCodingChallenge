import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { PrismaService } from './prisma.service';
import { InvoiceModule } from './invoice/invoice.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { UserResolver } from './resolvers/resolvers.user';
import { InvoiceResolver } from './resolvers/resolvers.invoice';

@Module({
  imports: [
    InvoiceModule,
    UserModule,
    AuthModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      buildSchemaOptions: { dateScalarMode: 'timestamp' },
    }),
    InvoiceModule,
  ],
  controllers: [AppController],
  providers: [PrismaService, UserResolver, InvoiceResolver, AppService],
})
export class AppModule {}

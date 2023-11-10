import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { PrismaService } from './prisma.service';
// import { UserResolver } from './resolvers/resolvers.user';
// import { PostResolver } from './resolvers/resolvers.post';
import { InvoiceModule } from './invoice/invoice.module';
import { InvoiceService } from './invoice/invoice.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    InvoiceModule,
    UserModule,
    AuthModule,
    // GraphQLModule.forRoot<ApolloDriverConfig>({
    //   driver: ApolloDriver,
    //   autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    //   buildSchemaOptions: { dateScalarMode: 'timestamp' },
    // }),
    // InvoiceModule,
  ],
  controllers: [AppController],
  //providers: [PrismaService, UserResolver, PostResolver, AppService],
  providers: [PrismaService, AppService],
})
export class AppModule {}

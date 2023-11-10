import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import {
  AuthCheckResponse,
  AuthResponse,
  CreateUserResponse,
} from './auth.interface';

@Injectable()
export class AuthService {
  constructor(
    @Inject(PrismaService) private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(data: LoginAuthDto): Promise<AuthResponse> {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!user) {
      return { message: 'User not found', token: null };
    }

    const valid = await bcrypt.compare(data.password, user.password);

    if (!valid) {
      return { message: 'Invalid password', token: null };
    }

    const token: string = await this.jwtService.signAsync({ id: user.id });

    return { message: 'Login successful', token: token };
  }

  async register(data: LoginAuthDto): Promise<CreateUserResponse> {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (user) {
      return {
        status: false,
        message: 'User already exists',
      };
    }

    const hash = await bcrypt.hash(data.password, 10);

    await this.prismaService.user.create({
      data: {
        email: data.email,
        password: hash,
      },
    });

    return {
      status: true,
      message: 'User created',
    };
  }

  async checkToken(reqToken: string): Promise<AuthCheckResponse> {
    try {
      const token = reqToken.split(' ')?.[1] ?? null;

      if (token) {
        const decoded = await this.jwtService.verifyAsync(token);
        const user = await this.prismaService.user.findUnique({
          where: {
            id: decoded.id,
          },
        });

        return user ? { validToken: true } : { validToken: false };
      }

      return { validToken: false };
    } catch (err) {
      console.log(err);
      return { validToken: false };
    }
  }
}

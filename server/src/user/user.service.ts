import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.prismaService.user.findFirst({
      where: { email: createUserDto.email },
    });
    if (user) {
      throw new Error('User already exists');
    }
    const hash = bcrypt.hashSync(createUserDto.password, 10);
    const newUser = await this.prismaService.user.create({
      data: {
        email: createUserDto.email,
        password: hash,
        name: createUserDto.name,
      },
    });
    delete newUser.password;
    return newUser;
  }

  async findAll() {
    return await this.prismaService.user.findMany();
  }

  findOne(id: number) {
    const user = this.prismaService.user.findUnique({
      where: { id: id },
    });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const user = this.prismaService.user.findUnique({
      where: { id: id },
    });
    if (!user) {
      throw new Error('User not found');
    }
    return this.prismaService.user.update({
      where: { id: id },
      data: {
        email: updateUserDto.email,
        name: updateUserDto.name,
      },
    });
  }

  remove(id: number) {
    const user = this.prismaService.user.findUnique({
      where: { id: id },
    });
    if (!user) {
      throw new Error('User not found');
    }
    return this.prismaService.user.delete({
      where: { id: id },
    });
  }
}

import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(createUserDto: CreateUserDto) {
    const verifyExistenceEmailPhone = await this.prisma.user.findFirst({
      where: {
        OR: [{ email: createUserDto.email }, { phone: createUserDto.phone }],
      },
    });
    if (verifyExistenceEmailPhone) {
      throw new ConflictException('Already used Email or Phone');
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(createUserDto.password, saltRounds);

    return this.prisma.user.create({
      data: {
        firstName: createUserDto.firstName,
        lastName: createUserDto.lastName,
        phone: createUserDto.phone,
        email: createUserDto.email,
        password: hashedPassword,
      },
    });
  }

  async findAllUsers() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        phone: true,
        email: true,
        createdAt: true,
      },
    });
  }

  async findOneUser(id: string) {
    const user = this.prisma.user.findUnique({
      where: {id},
      select: {
        id: true,
        firstName: true,
        lastName: true,
        phone: true,
        email: true,
        createdAt: true,
      },
    });
    if (!user) {
      throw new NotFoundException(`Cannot find user id (${id})`);
    }
    return user;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    await this.findOneUser(id);
    return this.prisma.user.update({
      where: {id},
      data: updateUserDto,
    });
  }

  async removeUser(id: string) {
    await this.findOneUser(id);
    return this.prisma.user.delete({
      where: {id}
    })
  }
}

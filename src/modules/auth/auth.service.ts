import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { LoginSuperadminDto } from './dto/superadmin/login-superadmin.dto';
import { LoginUserDto } from './dto/user/login-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
 constructor(private readonly prisma: PrismaService, private readonly jwtService: JwtService) {}

  async loginSuperadmin(loginSuperadminDto: LoginSuperadminDto) {
    const superadmin = await this.prisma.superadmin.findUnique({
      where: { email: loginSuperadminDto.email },
    });

    if (!superadmin) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(loginSuperadminDto.password, superadmin.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const access_token = this.jwtService.sign({
      sub: superadmin.id,
      role: 'superadmin',
    });
    return { access_token };
  }

  async loginUser(loginUserDto: LoginUserDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: loginUserDto.email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(loginUserDto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const access_token = this.jwtService.sign({
      sub: user.id,
      role: 'user',
    });
    return { access_token };
  }
}
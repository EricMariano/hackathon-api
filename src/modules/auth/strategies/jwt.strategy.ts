import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../../../common/prisma/prisma.service';

export interface JwtPayload {
  sub: string;
  role: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
      ignoreExpiration: false,
    });
  }

  async validate(payload: JwtPayload) {
    if (payload.role === 'user') {
      const user = await this.prisma.user.findUnique({
        where: { id: payload.sub },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
        },
      });
      if (!user) {
        throw new UnauthorizedException();
      }
      return { ...user, role: 'user' as const };
    }

    if (payload.role === 'superadmin') {
      const superadmin = await this.prisma.superadmin.findUnique({
        where: { id: payload.sub },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
        },
      });
      if (!superadmin) {
        throw new UnauthorizedException();
      }
      return { ...superadmin, role: 'superadmin' as const };
    }

    throw new UnauthorizedException();
  }
}

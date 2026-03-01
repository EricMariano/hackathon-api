import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/user/login-user.dto';
import { LoginSuperadminDto } from './dto/superadmin/login-superadmin.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('user/login')
  @ApiOperation({ summary: 'Login de usuário' })
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.loginUser(loginUserDto);
  }

  @Post('superadmin/login')
  @ApiOperation({ summary: 'Login de superadmin' })
  loginSuperadmin(@Body() loginSuperadminDto: LoginSuperadminDto) {
    return this.authService.loginSuperadmin(loginSuperadminDto);
  }
}

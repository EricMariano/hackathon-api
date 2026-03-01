import { IsString, IsNotEmpty } from 'class-validator';

export class LoginSuperadminDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
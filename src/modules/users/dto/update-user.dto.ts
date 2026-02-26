import { IsString, IsEmail, IsOptional, IsPhoneNumber } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  firstName: string;

  @IsString()
  @IsOptional()
  lastName: string;

  @IsPhoneNumber(undefined, { message: 'Phone must be a valid number (e.g. +5511999999999)' })
  @IsOptional()
  phone: string;

  @IsEmail()
  @IsString()
  @IsOptional()
  email: string;
}

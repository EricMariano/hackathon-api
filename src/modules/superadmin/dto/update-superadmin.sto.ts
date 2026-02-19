import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength, MaxLength } from "class-validator";
import { IsPhoneNumber } from "class-validator";

export class UpdateSuperadminDto {
  
  @IsString()
  @IsOptional()
  firstName: string

  @IsString()
  @IsOptional()
  lastName: string
  
  @IsPhoneNumber()
  @IsString()
  @IsOptional()
  phone: string

  @IsEmail()
  @IsString()
  @IsOptional()
  email: string
}
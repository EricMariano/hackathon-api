import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength, MaxLength } from "class-validator";
import { IsPhoneNumber } from "class-validator";

export class CreateSuperadminDto {
  
  @IsString()
  @IsNotEmpty({ message: 'First name is required' })
  firstName: string

  @IsString()
  @IsNotEmpty({ message: 'Last name is required' })
  lastName: string
  
  @IsPhoneNumber()
  @IsString()
  @IsNotEmpty({ message: 'Phone number is required' })
  phone: string

  @IsEmail()
  @IsString()
  @IsNotEmpty({ message: 'Email is required' })
  email: string

  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(8, {message: 'Password must be at least 8 characters long'})
  @MaxLength(32, {message: 'Password must be at least 32 characters short'})
  password: string

}
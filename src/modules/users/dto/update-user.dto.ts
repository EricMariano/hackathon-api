import { IsString, IsEmail, IsOptional } from 'class-validator';
import { isPhoneNumber } from 'src/common/decorators/phone-validation';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  firstName: string;

  @IsString()
  @IsOptional()
  lastName: string;

  @isPhoneNumber()
  @IsString()
  @IsOptional()
  phone: string;

  @IsEmail()
  @IsString()
  @IsOptional()
  email: string;
}

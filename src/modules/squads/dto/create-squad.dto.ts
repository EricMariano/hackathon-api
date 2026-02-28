import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsArray,
  IsOptional,
  Min,
} from 'class-validator';

export class CreateSquadDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  passkey?: string;

  @IsArray()
  @IsOptional()
  members?: string[];

  @IsNumber()
  @Min(1)
  membersQuantity: number;

  @IsString()
  @IsNotEmpty()
  eventId: string;

  @IsString()
  @IsNotEmpty()
  createdBy: string;
}
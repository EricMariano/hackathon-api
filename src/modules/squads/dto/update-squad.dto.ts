import { IsString, IsNumber, IsOptional, Min } from 'class-validator';

export class UpdateSquadDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  passkey?: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  membersQuantity?: number;
}

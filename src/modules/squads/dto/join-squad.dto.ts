import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class JoinSquadDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsOptional()
  passkey?: string;
}

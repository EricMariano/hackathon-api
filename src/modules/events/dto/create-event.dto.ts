import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsDate, IsArray, IsOptional } from 'class-validator';

export class CreateEventDto {
  @ApiProperty({ example: 'Hackathon 2025' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Evento de maratona de programação' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: '2025-03-01T09:00:00.000Z' })
  @IsDate()
  @IsNotEmpty()
  startDate: Date;

  @ApiProperty({ example: '2025-03-02T18:00:00.000Z' })
  @IsDate()
  @IsNotEmpty()
  endDate: Date;

  @ApiProperty({ example: 'São Paulo' })
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiProperty({ example: ['tech', 'inovação'], type: [String] })
  @IsArray()
  @IsNotEmpty()
  categoryBadges: string[];

  @ApiPropertyOptional({ description: 'Se omitido, o link é gerado automaticamente' })
  @IsString()
  @IsOptional()
  eventLink?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  organizationId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  superadminId: string;

  @ApiProperty({ example: [], type: [String] })
  @IsArray()
  @IsNotEmpty()
  squads: string[];
}
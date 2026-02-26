import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsDate, IsArray, IsOptional } from 'class-validator';

export class UpdateEventDto {
  @ApiPropertyOptional({ example: 'Hackathon 2025 - Atualizado' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ example: '2025-03-01T09:00:00.000Z' })
  @IsDate()
  @IsOptional()
  startDate?: Date;

  @ApiPropertyOptional({ example: '2025-03-02T18:00:00.000Z' })
  @IsDate()
  @IsOptional()
  endDate?: Date;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  location?: string;

  @ApiPropertyOptional({ type: [String] })
  @IsArray()
  @IsOptional()
  categoryBadges?: string[];

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  eventLink?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  organizationId?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  superadminId?: string;

  @ApiPropertyOptional({ type: [String] })
  @IsArray()
  @IsOptional()
  squads?: string[];
}
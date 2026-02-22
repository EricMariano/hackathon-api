import { IsString, IsEmail, IsNotEmpty, IsUUID, IsOptional, IsUrl, MinLength, MaxLength } from "class-validator";

export class UpdateOrgDto {
  @IsString()
  @IsOptional()
  name: string
  
  @IsString()
  @IsOptional()
  description: string
  
  @IsString()
  @IsEmail()
  @IsOptional()
  email: string
  
  @IsOptional()
  // @IsUrl()
  website: string

  // TODO: IMPLEMENT BUCKET SYNC (GCS/S3/CLOUDFLARE R2)
  //@IsOptional()
  //logo: File
  
  //@IsOptional()
  //banner: File
}
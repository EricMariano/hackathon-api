import { IsString, IsEmail, IsNotEmpty, IsUUID, IsOptional } from "class-validator";

export class CreateOrgDto {
  @IsString()
  @IsNotEmpty()
  name: string
  
  @IsString()
  @IsNotEmpty()
  description: string
  
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string
  
  @IsOptional()
  // @IsUrl()
  website: string

  // TODO: IMPLEMENT BUCKET SYNC (GCS/S3/CLOUDFLARE R2)
  //@IsOptional()
  //logo: File
  
  //@IsOptional()
  //banner: File
  
  @IsUUID()
  @IsNotEmpty()
  superadminId: string
}
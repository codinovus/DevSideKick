import { IsNotEmpty, IsString } from 'class-validator';

export class JwtDecodeRequestDto {
  @IsString()
  @IsNotEmpty()
  token: string;
}

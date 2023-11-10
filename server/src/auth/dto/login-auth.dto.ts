import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class LoginAuthDto {
  @ApiProperty()
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  readonly password: string;
}

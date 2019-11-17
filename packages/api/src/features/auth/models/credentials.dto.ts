import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export default class CredentialsDto {
  @ApiProperty({
    description: 'account login',
  })
  @IsString()
  @IsNotEmpty()
  readonly login!: string;

  @ApiProperty({
    description: 'account password',
  })
  @IsString()
  @IsNotEmpty()
  readonly password!: string;
}

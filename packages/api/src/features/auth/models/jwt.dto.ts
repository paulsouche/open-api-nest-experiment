import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export default class JwtDto {
  @ApiProperty({
    description: 'jwt expires in 1 hour',
  })
  @IsString()
  @IsNotEmpty()
  jwt!: string;
}

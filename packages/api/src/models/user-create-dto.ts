import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsOptional, IsString } from 'class-validator';

export default class UserCreateDto {
  @ApiProperty({
    description: 'user firstname',
    required: false,
    type: String,
  })
  @IsString()
  @IsOptional()
  firstname?: string | undefined;

  @ApiProperty({
    description: 'user lastname',
    required: true,
  })
  @IsString()
  @IsDefined()
  lastname!: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsOptional, IsString } from 'class-validator';

export default class UserUpdateDto {
  @ApiProperty({
    description: 'user id',
    required: true,
  })
  @IsString()
  @IsDefined()
  id!: string;

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

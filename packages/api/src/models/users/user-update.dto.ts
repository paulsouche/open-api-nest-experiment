import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDefined, IsOptional, IsString } from 'class-validator';
import userId from './user-id';

export default class UserUpdateDto {
  @ApiProperty({
    description: 'user id',
    type: String,
  })
  @IsString()
  @IsDefined()
  id!: userId;

  @ApiPropertyOptional({
    description: 'user firstname',
    type: String,
  })
  @IsString()
  @IsOptional()
  firstname?: string | undefined;

  @ApiProperty({
    description: 'user lastname',
  })
  @IsString()
  @IsDefined()
  lastname!: string;
}

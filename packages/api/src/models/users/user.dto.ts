import { ApiProperty } from '@nestjs/swagger';
import userId from './user-id';

export default class UserDto {
  @ApiProperty({
    description: 'user id',
    type: String,
  })
  id!: userId;

  @ApiProperty({
    description: 'user firstname',
    required: false,
    type: String,
  })
  firstname?: string | undefined;

  @ApiProperty({
    description: 'user lastname',
  })
  lastname!: string;
}

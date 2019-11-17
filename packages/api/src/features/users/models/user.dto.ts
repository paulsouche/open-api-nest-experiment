import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import userId from './user-id';

export default class UserDto {
  @ApiProperty({
    description: 'user id',
    type: String,
  })
  id!: userId;

  @ApiPropertyOptional({
    description: 'user firstname',
    type: String,
  })
  firstname?: string | undefined;

  @ApiProperty({
    description: 'user lastname',
  })
  lastname!: string;
}

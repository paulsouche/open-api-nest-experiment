import { ApiProperty } from '@nestjs/swagger';

export default class UserDto {
  @ApiProperty({
    description: 'user id',
  })
  id!: string;

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

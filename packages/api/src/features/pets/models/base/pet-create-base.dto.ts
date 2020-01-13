import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString } from 'class-validator';
import userId from '../../../users/models/user-id';

export default class PetCreateBaseDto {
  @ApiProperty({
    description: 'pet user id',
    type: String,
  })
  @IsString()
  @IsDefined()
  userId!: userId;

  @ApiProperty({
    description: 'pet nickname',
  })
  @IsString()
  @IsDefined()
  nickname!: string;
}

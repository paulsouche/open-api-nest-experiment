import { ApiProperty } from '@nestjs/swagger';
import userId from '../../../users/models/user-id';
import petId from '../pet-id';

export default class PetBaseDto {
  @ApiProperty({
    description: 'pet id',
    type: String,
  })
  id!: petId;

  @ApiProperty({
    description: 'pet user id',
    type: String,
  })
  userId!: userId;

  @ApiProperty({
    description: 'pet nickname',
  })
  nickname!: string;
}

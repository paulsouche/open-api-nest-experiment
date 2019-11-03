import { ApiProperty } from '@nestjs/swagger';
import userId from '../users/user-id';
import petId from './pet-id';
import PetKind, { PetKindEnum } from './pet-kind';

export default class PetDto {
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

  @ApiProperty({
    description: 'pet kind',
    enum: PetKindEnum,
  })
  kind!: keyof typeof PetKind;
}

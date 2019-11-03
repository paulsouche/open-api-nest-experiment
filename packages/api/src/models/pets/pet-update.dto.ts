import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsIn, IsString } from 'class-validator';
import userId from '../users/user-id';
import petId from './pet-id';
import PetKind, { PetKindEnum } from './pet-kind';

export default class PetUpdateDto {
  @ApiProperty({
    description: 'pet id',
    required: true,
    type: String,
  })
  @IsString()
  @IsDefined()
  id!: petId;

  @ApiProperty({
    description: 'pet user id',
    required: true,
    type: String,
  })
  @IsString()
  @IsDefined()
  userId!: userId;

  @ApiProperty({
    description: 'pet nickname',
    required: true,
    type: String,
  })
  @IsString()
  @IsDefined()
  nickname!: string;

  @ApiProperty({
    description: 'pet kind',
    enum: PetKindEnum,
    required: true,
  })
  @IsIn(PetKindEnum)
  @IsDefined()
  kind!: keyof typeof PetKind;
}

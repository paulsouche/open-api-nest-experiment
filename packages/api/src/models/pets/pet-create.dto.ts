import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsIn, IsString } from 'class-validator';
import userId from '../users/user-id';
import PetKind, { PetKindEnum } from './pet-kind';

export default class PetCreateDto {
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

  @ApiProperty({
    description: 'pet kind',
    enum: PetKindEnum,
  })
  @IsIn(PetKindEnum)
  @IsDefined()
  kind!: keyof typeof PetKind;
}

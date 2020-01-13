import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString } from 'class-validator';
import userId from '../../../users/models/user-id';
import petId from '../pet-id';

export default class PetUpdateBaseDto {
  @ApiProperty({
    description: 'pet id',
    type: String,
  })
  @IsString()
  @IsDefined()
  id!: petId;

  @ApiProperty({
    description: 'pet user id',
    type: String,
  })
  @IsString()
  @IsDefined()
  userId!: userId;

  @ApiProperty({
    description: 'pet nickname',
    type: String,
  })
  @IsString()
  @IsDefined()
  nickname!: string;
}

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDefined, IsIn, IsString } from 'class-validator';
import userId from '../users/user-id';
import CatMetasDto from './metas/cat-meta.dto';
import DogMetasDto from './metas/dog-meta.dto';
import HamsterMetasDto from './metas/hamster-meta.dto';
import RabbitMetasDto from './metas/rabbit-meta.dto';
import petId from './pet-id';
import PetKind, { PetKindEnum } from './pet-kind';

export default class PetUpdateDto {
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

  @ApiProperty({
    description: 'pet kind',
    enum: PetKindEnum,
  })
  @IsIn(PetKindEnum)
  @IsDefined()
  kind!: keyof typeof PetKind;

  // TODO metas validation
  @ApiPropertyOptional({
    oneOf: [
      {$ref: '#/components/schemas/CatMetasDto'},
      {$ref: '#/components/schemas/DogMetasDto'},
      {$ref: '#/components/schemas/HamsterMetasDto'},
      {$ref: '#/components/schemas/RabbitMetasDto'},
    ],
  })
  metas?: CatMetasDto | DogMetasDto | HamsterMetasDto | RabbitMetasDto;
}

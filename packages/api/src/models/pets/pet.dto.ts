import { ApiExtraModels, ApiOkResponse, ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import userId from '../users/user-id';
import CatMetasDto from './metas/cat-meta.dto';
import CommonMetasDto from './metas/common-meta.dto';
import DogMetasDto from './metas/dog-meta.dto';
import HamsterMetasDto from './metas/hamster-meta.dto';
import RabbitMetasDto from './metas/rabbit-meta.dto';
import petId from './pet-id';
import PetKind, { PetKindEnum } from './pet-kind';

ApiExtraModels(CommonMetasDto, CatMetasDto, DogMetasDto, HamsterMetasDto, RabbitMetasDto);

ApiOkResponse({type: CatMetasDto});

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

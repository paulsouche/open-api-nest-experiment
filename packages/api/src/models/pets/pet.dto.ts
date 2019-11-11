import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import PetBaseDto from './animals/pet-base.dot';
import CatMetasDto from './metas/cat-meta.dto';
import DogMetasDto from './metas/dog-meta.dto';
import HamsterMetasDto from './metas/hamster-meta.dto';
import RabbitMetasDto from './metas/rabbit-meta.dto';
import PetKind, { PetKindEnum } from './pet-kind';

export default class PetDto extends PetBaseDto {
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

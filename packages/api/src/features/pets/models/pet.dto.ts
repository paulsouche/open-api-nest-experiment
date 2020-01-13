import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import PetBaseDto from './base/pet-base.dto';
import PetKind, { PetKindEnum, PetMetas } from './pet-kind';

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
  metas?: PetMetas;
}

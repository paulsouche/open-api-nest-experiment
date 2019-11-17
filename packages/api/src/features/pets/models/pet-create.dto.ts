import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDefined, IsIn, IsString } from 'class-validator';
import userId from '../../users/models/user-id';
import { IsPetMetas } from '../pet-metas.validator';
import CatMetasDto from './metas/cat-meta.dto';
import DogMetasDto from './metas/dog-meta.dto';
import HamsterMetasDto from './metas/hamster-meta.dto';
import RabbitMetasDto from './metas/rabbit-meta.dto';
import PetKind, { PetKindEnum, PetMetas } from './pet-kind';

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

  @ApiPropertyOptional({
    oneOf: [
      { $ref: '#/components/schemas/CatMetasDto' },
      { $ref: '#/components/schemas/DogMetasDto' },
      { $ref: '#/components/schemas/HamsterMetasDto' },
      { $ref: '#/components/schemas/RabbitMetasDto' },
    ],
  })
  @IsPetMetas({
    Cat: CatMetasDto,
    Dog: DogMetasDto,
    Hamster: HamsterMetasDto,
    Rabbit: RabbitMetasDto,
  }, {
    message: 'Metas should match the kind of pet',
  })
  metas?: PetMetas;
}

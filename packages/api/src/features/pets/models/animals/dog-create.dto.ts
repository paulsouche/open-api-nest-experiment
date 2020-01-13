import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import PetCreateBaseDto from '../base/pet-create-base.dto';
import DogMetasDto from '../metas/dog-meta.dto';
import PetKind from '../pet-kind';

export class DogCreateDto extends PetCreateBaseDto {
  @ApiProperty({
    description: 'pet kind',
    enum: [PetKind.Dog],
  })
  kind!: 'Dog';

  @ApiPropertyOptional({
    type: DogMetasDto,
  })
  metas?: DogMetasDto;
}

import { ApiPropertyOptional } from '@nestjs/swagger';
import DogMetasDto from '../metas/dog-meta.dto';
import PetKind from '../pet-kind';
import PetDto from '../pet.dto';

export class DogDto extends PetDto {
  @ApiPropertyOptional({
    description: 'pet kind',
    enum: [PetKind.Dog],
  })
  kind!: 'Dog';

  @ApiPropertyOptional({
    type: DogMetasDto,
  })
  metas?: DogMetasDto;
}

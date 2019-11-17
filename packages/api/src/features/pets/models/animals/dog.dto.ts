import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import DogMetasDto from '../metas/dog-meta.dto';
import PetKind from '../pet-kind';
import PetBaseDto from './pet-base.dot';

export class DogDto extends PetBaseDto {
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

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import PetBaseDto from '../base/pet-base.dto';
import DogMetasDto from '../metas/dog-meta.dto';
import PetKind from '../pet-kind';

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

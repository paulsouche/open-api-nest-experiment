import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import PetUpdateBaseDto from '../base/pet-update-base.dto';
import DogMetasDto from '../metas/dog-meta.dto';
import PetKind from '../pet-kind';

export class DogUpdateDto extends PetUpdateBaseDto {
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

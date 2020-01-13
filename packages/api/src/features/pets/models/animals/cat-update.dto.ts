import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import PetUpdateBaseDto from '../base/pet-update-base.dto';
import CatMetasDto from '../metas/cat-meta.dto';
import PetKind from '../pet-kind';

export class CatUpdateDto extends PetUpdateBaseDto {
  @ApiProperty({
    description: 'pet kind',
    enum: [PetKind.Cat],
  })
  kind!: 'Cat';

  @ApiPropertyOptional({
    type: CatMetasDto,
  })
  metas?: CatMetasDto;
}

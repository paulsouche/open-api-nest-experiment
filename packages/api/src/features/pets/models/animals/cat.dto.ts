import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import PetBaseDto from '../base/pet-base.dto';
import CatMetasDto from '../metas/cat-meta.dto';
import PetKind from '../pet-kind';

export class CatDto extends PetBaseDto {
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

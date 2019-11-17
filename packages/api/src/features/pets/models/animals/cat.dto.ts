import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import CatMetasDto from '../metas/cat-meta.dto';
import PetKind from '../pet-kind';
import PetBaseDto from './pet-base.dot';

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

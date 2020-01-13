import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import PetCreateBaseDto from '../base/pet-create-base.dto';
import CatMetasDto from '../metas/cat-meta.dto';
import PetKind from '../pet-kind';

export class CatCreateDto extends PetCreateBaseDto {
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

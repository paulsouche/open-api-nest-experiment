import { ApiPropertyOptional } from '@nestjs/swagger';
import CatMetasDto from '../metas/cat-meta.dto';
import PetKind from '../pet-kind';
import PetDto from '../pet.dto';

export class CatDto extends PetDto {
  @ApiPropertyOptional({
    description: 'pet kind',
    enum: [PetKind.Cat],
  })
  kind!: 'Cat';

  @ApiPropertyOptional({
    type: CatMetasDto,
  })
  metas?: CatMetasDto;
}

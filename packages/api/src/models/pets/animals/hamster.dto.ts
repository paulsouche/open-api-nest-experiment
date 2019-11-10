import { ApiPropertyOptional } from '@nestjs/swagger';
import HamsterMetasDto from '../metas/hamster-meta.dto';
import PetKind from '../pet-kind';
import PetDto from '../pet.dto';

export class HamsterDto extends PetDto {
  @ApiPropertyOptional({
    description: 'pet kind',
    enum: [PetKind.Hamster],
  })
  kind!: 'Hamster';

  @ApiPropertyOptional({
    type: HamsterMetasDto,
  })
  metas?: HamsterMetasDto;
}

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import HamsterMetasDto from '../metas/hamster-meta.dto';
import PetKind from '../pet-kind';
import PetBaseDto from './pet-base.dot';

export class HamsterDto extends PetBaseDto {
  @ApiProperty({
    description: 'pet kind',
    enum: [PetKind.Hamster],
  })
  kind!: 'Hamster';

  @ApiPropertyOptional({
    type: HamsterMetasDto,
  })
  metas?: HamsterMetasDto;
}

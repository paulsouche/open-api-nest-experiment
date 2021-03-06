import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import PetBaseDto from '../base/pet-base.dto';
import HamsterMetasDto from '../metas/hamster-meta.dto';
import PetKind from '../pet-kind';

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

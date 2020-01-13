import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import PetCreateBaseDto from '../base/pet-create-base.dto';
import HamsterMetasDto from '../metas/hamster-meta.dto';
import PetKind from '../pet-kind';

export class HamsterCreateDto extends PetCreateBaseDto {
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

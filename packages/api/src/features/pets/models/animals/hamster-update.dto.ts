import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import PetUpdateBaseDto from '../base/pet-update-base.dto';
import HamsterMetasDto from '../metas/hamster-meta.dto';
import PetKind from '../pet-kind';

export class HamsterUpdateDto extends PetUpdateBaseDto {
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

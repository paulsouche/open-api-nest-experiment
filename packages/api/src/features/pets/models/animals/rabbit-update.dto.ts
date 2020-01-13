import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import PetUpdateBaseDto from '../base/pet-update-base.dto';
import RabbitMetasDto from '../metas/rabbit-meta.dto';
import PetKind from '../pet-kind';

export class RabbitUpdateDto extends PetUpdateBaseDto {
  @ApiProperty({
    description: 'pet kind',
    enum: [PetKind.Rabbit],
  })
  kind!: 'Rabbit';

  @ApiPropertyOptional({
    type: RabbitMetasDto,
  })
  metas?: RabbitMetasDto;
}

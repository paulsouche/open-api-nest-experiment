import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import PetCreateBaseDto from '../base/pet-create-base.dto';
import RabbitMetasDto from '../metas/rabbit-meta.dto';
import PetKind from '../pet-kind';

export class RabbitCreateDto extends PetCreateBaseDto {
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

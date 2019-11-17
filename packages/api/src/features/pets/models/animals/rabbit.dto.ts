import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import RabbitMetasDto from '../metas/rabbit-meta.dto';
import PetKind from '../pet-kind';
import PetBaseDto from './pet-base.dot';

export class RabbitDto extends PetBaseDto {
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

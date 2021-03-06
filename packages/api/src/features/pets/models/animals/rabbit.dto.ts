import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import PetBaseDto from '../base/pet-base.dto';
import RabbitMetasDto from '../metas/rabbit-meta.dto';
import PetKind from '../pet-kind';

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

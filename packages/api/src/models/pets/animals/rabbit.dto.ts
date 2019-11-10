import { ApiPropertyOptional } from '@nestjs/swagger';
import RabbitMetasDto from '../metas/rabbit-meta.dto';
import PetKind from '../pet-kind';
import PetDto from '../pet.dto';

export class RabbitDto extends PetDto {
  @ApiPropertyOptional({
    description: 'pet kind',
    enum: [PetKind.Rabbit],
  })
  kind!: 'Rabbit';

  @ApiPropertyOptional({
    type: RabbitMetasDto,
  })
  metas?: RabbitMetasDto;
}

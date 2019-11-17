import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import CommonMetasDto from './common-meta.dto';

export default class RabbitMetasDto extends CommonMetasDto {
  @ApiPropertyOptional({
    description: 'rabbit groomer meta',
    type: String,
  })
  @IsString()
  @IsOptional()
  groomer?: string | undefined;
}

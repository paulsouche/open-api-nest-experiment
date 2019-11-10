import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import CommonMetasDto from './common-meta.dto';

export default class HamsterMetasDto extends CommonMetasDto {
  @ApiPropertyOptional({
    description: 'hamster cageProvider meta',
    type: String,
  })
  @IsString()
  @IsOptional()
  cageProvider?: string | undefined;
}

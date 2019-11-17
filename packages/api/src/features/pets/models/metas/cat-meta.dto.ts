import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import CommonMetasDto from './common-meta.dto';

export default class CatMetasDto extends CommonMetasDto {
  @ApiPropertyOptional({
    description: 'cat breed meta',
    type: String,
  })
  @IsString()
  @IsOptional()
  breed?: string | undefined;
}

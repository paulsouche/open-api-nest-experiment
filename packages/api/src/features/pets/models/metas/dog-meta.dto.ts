import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';
import CommonMetasDto from './common-meta.dto';

export default class DogMetasDto extends CommonMetasDto {
  @ApiPropertyOptional({
    description: 'dog trainings meta',
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  trainings?: string[] | undefined;
}

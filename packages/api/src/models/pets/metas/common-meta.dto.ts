import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export default class CommonMetasDto {
  @ApiPropertyOptional({
    description: 'pet eats meta',
    type: String,
  })
  @IsString()
  @IsOptional()
  eats?: string | undefined;
}

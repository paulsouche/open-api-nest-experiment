import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDefined, IsOptional, IsString } from 'class-validator';

export default class UserCreateDto {
  @ApiPropertyOptional({
    description: 'user firstname',
    type: String,
  })
  @IsString()
  @IsOptional()
  firstname?: string | undefined;

  @ApiProperty({
    description: 'user lastname',
  })
  @IsString()
  @IsDefined()
  lastname!: string;
}

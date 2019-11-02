import { IsDefined, IsOptional, IsString } from 'class-validator';

export default class UserCreateDto {
  @IsString()
  @IsOptional()
  firstname?: string | undefined;

  @IsString()
  @IsDefined()
  lastname!: string;
}

import { IsDefined, IsOptional, IsString } from 'class-validator';

export default class UserUpdateDto {
  @IsString()
  @IsDefined()
  id!: string;

  @IsString()
  @IsOptional()
  firstname?: string | undefined;

  @IsString()
  @IsDefined()
  lastname!: string;
}

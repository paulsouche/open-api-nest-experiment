import { ApiProperty } from '@nestjs/swagger';
import UserDto from '../../users/models/user.dto';
import PetDto from './pet.dto';

export default class PetDetailedDto extends PetDto {
  @ApiProperty({
    type: UserDto,
  })
  user!: UserDto;
}

import { ApiProperty } from '@nestjs/swagger';
import PetDto from '../pets/pet.dto';
import UserDto from './user.dto';

export default class UserDetailedDto extends UserDto {
  @ApiProperty({
    description: 'user pets',
    type: [PetDto],
  })
  pets!: PetDto[];
}

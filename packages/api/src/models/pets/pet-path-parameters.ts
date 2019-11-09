import ApiPathParameter from '../../annotations/api-path-parameter';
import userId from '../users/user-id';
import petId from './pet-id';

export default class PetPathParans {
  @ApiPathParameter({
    description: 'user id',
    type: String,
  })
  userId!: userId;

  @ApiPathParameter({
    description: 'pet id',
    type: String,
  })
  id!: petId;
}

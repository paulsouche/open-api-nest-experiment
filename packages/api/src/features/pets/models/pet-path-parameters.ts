import ApiPathParameter from '../../../annotations/api-path-parameter';
import userId from '../../users/models/user-id';
import petId from './pet-id';

export default class PetPathParaneters {
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

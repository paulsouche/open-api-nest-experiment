import { ApiProperty } from '@nestjs/swagger';
import accountId from './account-id';

export default class DeserializedJwtDto {
  @ApiProperty({
    description: 'Accountid',
    type: String,
  })
  sub!: accountId;

  @ApiProperty({
    description: 'Expiration timestamp',
  })
  exp!: number;
}

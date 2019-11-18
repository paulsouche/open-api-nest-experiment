import { ApiProperty } from '@nestjs/swagger';
import accountId from './account-id';

export default class DeserialiwedJwtDto {
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

import { ApiProperty } from '@nestjs/swagger';

export class Page<T> {
  @ApiProperty()
  items: T[];

  @ApiProperty()
  total: number;
}

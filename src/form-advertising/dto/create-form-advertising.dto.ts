import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateFormAdvertisingDto {
  @ApiProperty({ description: 'The name of the form advertising', required: true })

  @IsNotEmpty()
  name: string;
}
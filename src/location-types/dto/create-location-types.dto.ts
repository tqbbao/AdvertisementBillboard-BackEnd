import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateLocationTypesDto {
  @ApiProperty({ description: 'The name of the location type', required: true })

  @IsNotEmpty()
  name: string;
}
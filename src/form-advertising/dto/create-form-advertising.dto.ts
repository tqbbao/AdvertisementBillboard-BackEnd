import { IsNotEmpty } from 'class-validator';

export class CreateFormAdvertisingDto {
  @IsNotEmpty()
  name: string;
}

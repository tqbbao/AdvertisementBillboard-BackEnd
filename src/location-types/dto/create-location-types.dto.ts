import { IsNotEmpty } from 'class-validator';

export class CreateLocationTypesDto {
  @IsNotEmpty()
  name: string;
}

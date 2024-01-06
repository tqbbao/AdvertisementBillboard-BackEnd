import { IsNotEmpty } from 'class-validator';

export class CreateFormReportsDto {
  @IsNotEmpty()
  name: string;
}

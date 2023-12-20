import { IsNotEmpty } from 'class-validator';
import { FormAdvertising } from 'src/entity/form-advertising.entity';
import { LocationTypes } from 'src/entity/location-types.entity';
import { Zoning } from 'src/entity/spaces.entity';
import { Wards } from 'src/entity/wards.entity';

export class CreateSpaceDto {
  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  latitude: number;

  @IsNotEmpty()
  longtitude: number;

  imgUrl: string;

  role: Zoning;

  @IsNotEmpty()
  formAdvertising: FormAdvertising;

  @IsNotEmpty()
  locationTypes: LocationTypes;

  @IsNotEmpty()
  ward: Wards;
}

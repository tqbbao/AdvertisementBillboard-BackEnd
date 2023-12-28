import { IsEnum, IsNotEmpty } from "class-validator";
import { SpaceZone } from "src/common/enums/space-zone.enum";
import { Districts } from "src/entity/districts.entity";
import { FormAdvertising } from "src/entity/form-advertising.entity";
import { LocationTypes } from "src/entity/location-types.entity";
// import { Zoning } from "src/entity/spaces.entity";
import { Wards } from "src/entity/wards.entity";

export class UpdateSpaceDto {
  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  latitude: number;

  @IsNotEmpty()
  longitude: number;

  imgUrl: string;

  @IsEnum(SpaceZone, { message: 'Invalid zone value (Planned/UnPlanned)' })
  zone: SpaceZone;
  
  @IsNotEmpty()
  formAdvertising: FormAdvertising;

  @IsNotEmpty()
  locationTypes: LocationTypes;

  @IsNotEmpty()
  ward: Wards;

  @IsNotEmpty()
  district: Districts;
}

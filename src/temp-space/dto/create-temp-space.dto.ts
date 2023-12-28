import { SpaceZone } from "src/common/enums/space-zone.enum";
import { Districts } from "src/entity/districts.entity";
import { FormAdvertising } from "src/entity/form-advertising.entity";
import { LocationTypes } from "src/entity/location-types.entity";
import { Wards } from "src/entity/wards.entity";

export class CreateTempSpaceDto {
  reason: string;
  address: string;
  latitude: number;
  longitude: number;
  imgUrl: string;
  zone: SpaceZone;
  formAdvertising: FormAdvertising;
  locationTypes: LocationTypes;
  wards: Wards;
  districts: Districts;
}

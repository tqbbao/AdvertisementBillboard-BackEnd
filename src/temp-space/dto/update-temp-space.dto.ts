import { SpaceZone } from "src/common/enums/space-zone.enum";
import { Districts } from "src/entity/districts.entity";
import { FormAdvertising } from "src/entity/form-advertising.entity";
import { LocationTypes } from "src/entity/location-types.entity";
import { Spaces } from "src/entity/spaces.entity";
import { Wards } from "src/entity/wards.entity";

export class UpdateTempSpaceDto {
    //Lý do update
    reason: string;
    //các giá trị dùng để update cho Space hiện tại và được lấy từ space hiện tại
    address: string;
    latitude: number;
    longitude: number;
    imgUrl: string;
    zone: SpaceZone;
    formAdvertising: FormAdvertising;
    locationTypes: LocationTypes;
    wards: Wards;
    districts: Districts;
    //Giá trị để giá định update cho space nào
    space: Spaces;
}
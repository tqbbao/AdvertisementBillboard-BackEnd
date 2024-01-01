import { Spaces } from "src/entity/spaces.entity";
import { SurfaceTypes } from "src/entity/surface-types.entity";
import { Surfaces } from "src/entity/surfaces.entity";

export class UpdateTempSurfaceDto {
    //Lý do update
    reason: string;
    //các giá trị dùng để update cho Surface hiện tại và được lấy từ surface hiện tại
    height: number;
    width: number;  
    imgUrl: string;
    expiryDate: Date;
    surfaceType: SurfaceTypes;
    space: Spaces;
    //Giá trị để giá định update cho surface nào
    surface: Surfaces;
}
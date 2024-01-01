import { Spaces } from "src/entity/spaces.entity";
import { SurfaceTypes } from "src/entity/surface-types.entity";

export class CreateTempSurfaceDto {
  //Lý do update
  reason: string;
  //các giá trị dùng để create cho Surface
  height: number;
  width: number;
  imgUrl: string;
  expiryDate: Date;
  surfaceType: SurfaceTypes;
  space: Spaces;
}

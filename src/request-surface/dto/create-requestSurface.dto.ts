import { ReportSurface } from "src/entity/reportSurface.entity";
import { Spaces } from "src/entity/spaces.entity";
import { SurfaceTypes } from "src/entity/surface-types.entity";
import { Surfaces } from "src/entity/surfaces.entity";

export class CreateRequestSurfaceDto {
    reason: string;
    height: number;
    width: number;
    imgUrl: string;
    expiryDate: Date;
    surfaceType: SurfaceTypes;
    reportSurface: ReportSurface;
    surface: Surfaces
}
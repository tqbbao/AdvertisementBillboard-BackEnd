import { IsNotEmpty } from 'class-validator';
import { Spaces } from 'src/entity/spaces.entity';
import { SurfaceTypes } from 'src/entity/surface-types.entity';

export class UpdateSurfaceDto {
  @IsNotEmpty()
  height: number;
  @IsNotEmpty()
  width: number;
  imgUrl: string;
  expiryDate: Date;
  surfaceType: SurfaceTypes;
  space: Spaces;
}

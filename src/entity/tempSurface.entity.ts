import { RequestState } from 'src/common/enums/request-state.enum';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SurfaceTypes } from './surface-types.entity';
import { Spaces } from './spaces.entity';
import { Surfaces } from './surfaces.entity';


@Entity({ name: 'temp_surface' })
export class TempSurface {
  @PrimaryGeneratedColumn({
    type: 'smallint',
    name: 'id',
    unsigned: true,
  })
  id: number;

  //Lý do chỉnh sửa
  @Column('longtext', { name: 'reason' })
  reason: string;
  
  @Column({ type: 'enum', enum: RequestState, default: RequestState.PENDING })
  state: RequestState;
  // Chiều cao bảng quảng cáo
  @Column('decimal', { name: 'height', precision: 10, scale: 2 })
  height: number;

  // Chiều rộng bảng quảng cáo
  @Column('decimal', { name: 'width', precision: 10, scale: 2 })
  width: number;

  // Hình ảnh bảng quảng cáo
  @Column('varchar', { name: 'img_url', length: 255, nullable: true })
  imgUrl: string;

  // Ngày hết hạn của hợp đồng quảng cáo
  @Column('timestamp', { name: 'expiry_date', nullable: true })
  expiryDate: Date;

  @ManyToOne(() => SurfaceTypes, (surfaceType) => surfaceType.tempSurfaces, {eager: true})
  surfaceType: SurfaceTypes;

  @ManyToOne(() => Surfaces, (surface) => surface.tempSurfaces, {eager: true, nullable: true})
  surface: Surfaces;


  @ManyToOne(() => Spaces, (space) => space.tempSurfaces, {eager: true})
  space: Spaces;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'last_update', type: 'timestamp' })
  lastUpdate: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date;
}

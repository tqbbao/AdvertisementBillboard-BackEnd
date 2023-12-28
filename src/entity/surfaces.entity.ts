import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SurfaceTypes } from './surface-types.entity';
import { Spaces } from './spaces.entity';
import { ReportSurface } from './reportSurface.entity';
import { PendingSurface } from './pendingEditSurface.entity';

@Entity({ name: 'surfaces' })
export class Surfaces {
  @PrimaryGeneratedColumn({
    type: 'smallint',
    name: 'id',
    unsigned: true,
  })
  id: number;

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

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'last_update', type: 'timestamp' })
  lastUpdate: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date;

  // Loại bảng quảng cáo - FK
  @ManyToOne(() => SurfaceTypes, (surfaceType) => surfaceType.surfaces, {eager: true})
  surfaceType: SurfaceTypes;

  // Thuộc về điểm đặt nào? - FK
  @ManyToOne(() => Spaces, (space) => space.surface, {eager: true})
  space: Spaces;


  //? KHÔNG NẰM TRONG DATABASE
  @OneToMany(
    () => ReportSurface,
    (reportSurface) => reportSurface.surface,
  )
  reportSurfaces: ReportSurface[];


}

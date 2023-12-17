import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { SurfaceTypes } from './surface-types.entity';

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

  @Column('timestamp', {
    name: 'last_update',
    default: () => 'CURRENT_TIMESTAMP',
  })
  lastUpdate: Date;

  @Column('timestamp', {
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  // Loại bảng quảng cáo - FK
  @ManyToOne(() => SurfaceTypes, (surfaceType) => surfaceType.surfaces)
  surfaceType: SurfaceTypes;

}

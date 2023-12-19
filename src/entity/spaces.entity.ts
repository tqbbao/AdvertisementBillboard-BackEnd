import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { FormAdvertising } from './form-advertising.entity';
import { LocationTypes } from './location-types.entity';
import { Surfaces } from './surfaces.entity';
import { Wards } from './wards.entity';
import { ReportLocation } from './reportLocation.entity';


export enum Zoning {
    DAQUYHOACH = 'Đã quy hoạch',
    CHUAQUYHOACH = 'Chưa quy hoạch',
    DANGXULY = 'Đang xử lý',
  }

@Entity({ name: 'spaces' })
export class Spaces {
  @PrimaryGeneratedColumn({
    type: 'smallint',
    name: 'id',
    unsigned: true,
  })
  id: number;

  // Địa chỉ
  @Column('varchar', { name: 'address', length: 255 })
  address: string;

  // Khu vực (Phường, Quận)


  // Latitude
  @Column('decimal', { name: 'latitude', precision: 10, scale: 6 })
  latitude: number;

  // Longitude
  @Column('decimal', { name: 'longtitude', precision: 10, scale: 6 })
  longtitude: number;

  // Hình ảnh đặt bảng quảng cáo
  @Column('varchar', { name: 'img_url', length: 255, nullable: true })
  imgUrl: string;

  // Thông tin về điểm đặt đã được quy hoạch hay chưa?
  @Column({
    type: 'enum',
    enum: Zoning,
    default: Zoning.DANGXULY,
  })
  role: Zoning;

  @OneToMany(() => Surfaces, (surface) => surface.space)
  surface: Surfaces[];
  

  // Hình thức quảng cáo - FK
  @ManyToOne(() => FormAdvertising, formAdvertising => formAdvertising.spaces, { eager: true })
  formAdvertising: FormAdvertising;
  // Loại vị trí - FK
  @ManyToOne(() => LocationTypes, locationTypes => locationTypes.spaces,  { eager: true })
  locationTypes: LocationTypes;

  @ManyToOne(() => Wards, ward => ward.spaces, { eager: true })
  ward: Wards;

  @OneToMany(() => ReportLocation, (reportLocation) => reportLocation.space)
  reportLocations: ReportLocation[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'last_update', type: 'timestamp' })
  lastUpdate: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date;

}

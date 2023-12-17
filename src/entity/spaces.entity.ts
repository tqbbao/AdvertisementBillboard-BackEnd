import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { FormAdvertising } from './form-advertising.entity';
import { LocationTypes } from './location-types.entity';


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
  @Column('decimal', { name: 'longitude', precision: 10, scale: 6 })
  longitude: number;

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
  

  // Hình thức quảng cáo - FK
  @ManyToOne(() => FormAdvertising, formAdvertising => formAdvertising.spaces)
  formAdvertising: FormAdvertising;
  // Loại vị trí - FK
  @ManyToOne(() => LocationTypes, locationTypes => locationTypes.spaces)
  locationTypes: LocationTypes;
}

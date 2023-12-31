import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Spaces } from './spaces.entity';
import { SpaceZone } from 'src/common/enums/space-zone.enum';
import { FormAdvertising } from './form-advertising.entity';
import { LocationTypes } from './location-types.entity';
import { Wards } from './wards.entity';
import { Districts } from './districts.entity';
import { RequestState } from 'src/common/enums/request-state.enum';

@Entity({ name: 'temp_space' })
export class TempSpace {
  @PrimaryGeneratedColumn({
    type: 'smallint',
    name: 'id',
    unsigned: true,
  })
  id: number;

  //Lý do chỉnh sửa
  @Column('longtext', { name: 'reason' })
  reason: string;


  //? THÔNG TIN MỚI CỦA ĐIỂM ĐẶT QUẢNG CÁO
  @Column('varchar', { name: 'address', length: 255 })
  address: string;

  // Latitude
  @Column('decimal', { name: 'latitude', precision: 10, scale: 6})
  latitude: number;

  // Longitude
  @Column('decimal', { name: 'longitude', precision: 10, scale: 6})
  longitude: number;

  @Column('varchar', { name: 'img_url', length: 255, nullable: true })
  imgUrl: string;

  @Column({
    type: 'enum',
    enum: SpaceZone,
    default: SpaceZone.UNPLANNED,
  })
  zone: SpaceZone;


  //@ManyToOne()
  @ManyToOne(() => FormAdvertising, formAdvertising => formAdvertising.tempSpaces, { eager: true })
  formAdvertising: FormAdvertising;

  // Loại vị trí (Đất công/Trung tâm thương mại/Chợ,.....) - FK
  @ManyToOne(() => LocationTypes, locationTypes => locationTypes.tempSpaces,  { eager: true })
  locationTypes: LocationTypes;
  
  // Khu vực (Phường, Quận) - FK
  @ManyToOne(() => Wards, ward => ward.tempSpaces, { eager: true })
  ward: Wards;

  @ManyToOne(() => Districts, district => district.tempSpaces, { eager: true })
  district: Districts;


  @Column({ type: 'enum', enum: RequestState, default: RequestState.PENDING })
  state: RequestState;


  @ManyToOne(() => Spaces, space => space.tempSpaces, { eager: true, nullable: true })
  space: Spaces;



  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'last_update', type: 'timestamp' })
  lastUpdate: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date;
}

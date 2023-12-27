import { Request } from 'express';
import {
    Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ReportSpace } from './reportSpace.entity';
import { PendingSpace } from './pendingEditSpace.entity';
import { SpaceZone } from 'src/common/enums/space-zone.enum';
import { FormAdvertising } from './form-advertising.entity';
import { LocationTypes } from './location-types.entity';
import { Wards } from './wards.entity';
import { Districts } from './districts.entity';
import { RequestState } from 'src/common/enums/request-state.enum';
@Entity({ name: 'request_edit_space' })
export class RequestEditSpace {
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
  @Column('decimal', { name: 'latitude'})
  latitude: number;

  // Longitude
  @Column('decimal', { name: 'longitude'})
  longitude: number;

  
  // Hình ảnh đặt bảng quảng cáo
  @Column('varchar', { name: 'img_url', length: 255, nullable: true })
  imgUrl: string;
  
  @Column({
    type: 'enum',
    enum: SpaceZone,
    default: SpaceZone.UNPLANNED,
  })
  zone: SpaceZone;
  
  //Reported space
  @OneToOne(() => ReportSpace, { nullable: false, eager: true })
  @JoinColumn()
  reportSpace: ReportSpace;

  @ManyToOne(() => FormAdvertising, formAdvertising => formAdvertising.requestEditSpaces, { eager: true })
  formAdvertising: FormAdvertising;

  // Loại vị trí (Đất công/Trung tâm thương mại/Chợ,.....) - FK
  @ManyToOne(() => LocationTypes, locationTypes => locationTypes.requestEditSpaces,  { eager: true })
  locationTypes: LocationTypes;
  
  // Khu vực (Phường, Quận) - FK
  @ManyToOne(() => Wards, ward => ward.requestEditSpaces, { eager: true })
  ward: Wards;

  @ManyToOne(() => Districts, district => district.requestEditSpaces, { eager: true })
  district: Districts;


  @Column({ type: 'enum', enum: RequestState, default: RequestState.PENDING })
  state: RequestState;


  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'last_update', type: 'timestamp' })
  lastUpdate: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date;
}

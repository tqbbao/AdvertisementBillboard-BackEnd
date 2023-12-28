import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { FormAdvertising } from './form-advertising.entity';
import { LocationTypes } from './location-types.entity';
import { Surfaces } from './surfaces.entity';
import { Wards } from './wards.entity';
import { ReportSpace } from './reportSpace.entity';
import { SpaceZone } from 'src/common/enums/space-zone.enum';
import { Districts } from './districts.entity';
import { TempSpace } from './tempSpace.entity';

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

  // Latitude
  @Column('decimal', { name: 'latitude'})
  latitude: number;

  // Longitude
  @Column('decimal', { name: 'longitude'})
  longitude: number;

  // Hình ảnh đặt bảng quảng cáo
  @Column('varchar', { name: 'img_url', length: 255, nullable: true })
  imgUrl: string;

  // Thông tin về điểm đặt đã được quy hoạch hay chưa?
  @Column({
    type: 'enum',
    enum: SpaceZone,
    default: SpaceZone.PLANNED,
  })
  zone: SpaceZone;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'last_update', type: 'timestamp' })
  lastUpdate: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date;

  // Hình thức quảng cáo (Cổ động chính trị/Quản cáo thương mại/Xã hội hóa) - FK
  @ManyToOne(() => FormAdvertising, formAdvertising => formAdvertising.spaces, { eager: true })
  formAdvertising: FormAdvertising;
  // Loại vị trí (Đất công/Trung tâm thương mại/Chợ,.....) - FK
  @ManyToOne(() => LocationTypes, locationTypes => locationTypes.spaces,  { eager: true })
  locationTypes: LocationTypes;
  // Khu vực (Phường, Quận) - FK
  @ManyToOne(() => Wards, ward => ward.spaces, { eager: true })
  ward: Wards;

  @ManyToOne(() => Districts, district => district.spaces, { eager: true })
  district: Districts;


  

  //? KHÔNG NẰM TRONG DATABASE
  // Có nhiều bảng tạm quảng cáo
  // @OneToMany(() => PendingSpace, (pendingSpace) => pendingSpace.editForSpace)
  // pendingSpaces: PendingSpace[];

  // Có nhiều bảng quảng cáo
  @OneToMany(() => Surfaces, (surface) => surface.space)
  surface: Surfaces[];



  // 1 Space có nhiều reportSpace
  @OneToMany(() => ReportSpace, (reportSpace) => reportSpace.space)
  reportSpaces: ReportSpace[];


  @OneToMany(() => TempSpace, (reportSpace) => reportSpace.space)
  tempSpaces: TempSpace[];

}

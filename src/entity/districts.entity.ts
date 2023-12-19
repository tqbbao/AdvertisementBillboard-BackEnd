import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Wards } from './wards.entity';

@Entity({ name: 'districts' })
export class Districts {
  @PrimaryGeneratedColumn({
    type: 'smallint',
    name: 'id',
    unsigned: true,
  })
  id: number;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'name',
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 255,
    name: 'ma_qh',
    unique: true,
  })
  maQH: string;

  @OneToMany(() => Wards, ward => ward.district)
  wards: Wards[];


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

}

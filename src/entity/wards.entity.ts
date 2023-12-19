import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Districts } from './districts.entity';
import { Spaces } from './spaces.entity';

@Entity({ name: 'wards' })
export class Wards {
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
    name: 'ma_pk',
    unique: true,
  })
  maPK: string;

  // Quận - FK
  @ManyToOne(() => Districts, district => district.wards, { eager: true })
  district: Districts;

  @OneToMany(() => Spaces, space => space.ward)
  spaces: Spaces[];


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

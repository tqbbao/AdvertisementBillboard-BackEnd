import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Districts } from './districts.entity';
import { Spaces } from './spaces.entity';
import { PendingSpace } from './pendingEditSpace.entity';
import { RequestEditSpace } from './requestEditSpace.entity';
import { User } from './user.entity';

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
    name: 'id_geo',
    nullable: true,
  })
  idGeo: string;

  // @Column({
  //   type: 'varchar',
  //   length: 255,
  //   name: 'ma_pk',
  //   unique: true,
  // })
  // maPK: string;

  // Quận - FK
  @ManyToOne(() => Districts, district => district.wards, { eager: true })
  district: Districts;

  
  
  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'last_update', type: 'timestamp' })
  lastUpdate: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date;
  
  //? KHÔNG NẰM TRONG DATABASE
  @OneToMany(() => Spaces, space => space.ward)
  spaces: Spaces[];

  @OneToMany(() => RequestEditSpace, space => space.ward)
  requestEditSpaces: RequestEditSpace[];


  @OneToMany(() => User, user => user.ward)
  users: User[];
  
 
}

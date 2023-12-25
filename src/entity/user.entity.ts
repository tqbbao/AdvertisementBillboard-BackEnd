import { UserRole } from 'src/common/enums/user-role.enum';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Wards } from './wards.entity';
import { Districts } from './districts.entity';
import { Exclude } from 'class-transformer';
@Entity({ name: 'user' })
export class User {
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

  @Column('timestamp', {
    name: 'birth',
  })
  birth: Date;

  @Column('varchar', { unique: true, name: 'email', length: 45 })
  email: string;

  @Column('varchar', { name: 'phone', length: 15 })
  phone: string;

  @Exclude()
  @Column('varchar', { name: 'username', length: 255 })
  username: string;

  @Exclude()
  @Column('varchar', { name: 'password', length: 255 })
  password: string;

  @Exclude()
  @Column('varchar',{ name:'otp', nullable: true })
  otp: string; // Trường opt

  @Exclude()
  @Column('varchar', { nullable: true, name: 'refresh_token', length: 255 })
  refreshToken: string;

  @Column({
    type: 'enum',
    enum: UserRole,
  })
  role: UserRole;

  @ManyToOne(() => Wards, ward => ward.users, { eager: true, nullable: true })
  ward: Wards;

  @ManyToOne(() => Districts, district => district.users, { eager: true, nullable: true })
  district: Districts;




  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'last_update', type: 'timestamp' })
  lastUpdate: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date;
}

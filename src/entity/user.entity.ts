import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
export enum UserRole {
    CB_PHUONG = 'Cán bộ Phường',
    CB_QUAN = 'Cán bộ Quận',
    CD_SOVHTT = 'Cán bộ Sở VHTT',
  }
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
    name: 'full_name',
  })
  fullName: string;

  @Column('varchar', { unique: true, name: 'email', length: 45 })
  email: string;

  @Column('varchar', { name: 'username', length: 255 })
  username: string;

  @Column('varchar', { name: 'password', length: 255 })
  password: string;

  @Column('varchar', { name: 'phone', length: 15 })
  phone: string;
  
  @Column({
    type: 'enum',
    enum: UserRole,
    default: null,
  })
  role: UserRole;

  @Column('timestamp', {
    name: 'date_of_birth',
  })
  dateOfBirth: Date;

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

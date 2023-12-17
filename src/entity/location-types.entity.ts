import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Spaces } from './spaces.entity';

@Entity({ name: 'location_types' })
export class LocationTypes {
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
    name: 'last_update',
    default: () => 'CURRENT_TIMESTAMP',
  })
  lastUpdate: Date;

  @Column('timestamp', {
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;


  @OneToMany(() => Spaces, space => space.locationTypes)
  spaces: Spaces[];
}

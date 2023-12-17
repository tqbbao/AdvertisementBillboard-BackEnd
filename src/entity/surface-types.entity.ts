import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Surfaces } from './surfaces.entity';

@Entity({ name: 'surface_types' })
export class SurfaceTypes {
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

  @OneToMany(() => Surfaces, (surface) => surface.surfaceType)
  surfaces: Surfaces[];
}

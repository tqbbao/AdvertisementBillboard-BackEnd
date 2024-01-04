import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Surfaces } from './surfaces.entity';
import { PendingSurface } from './pendingEditSurface.entity';
import { RequestEditSurface } from './requestEditSurface.entity';
import { TempSurface } from './tempSurface.entity';

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

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'last_update', type: 'timestamp' })
  lastUpdate: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date;

  //? KHÔNG NẰM TRONG DATABASE
  @OneToMany(() => Surfaces, (surface) => surface.surfaceType)
  surfaces: Surfaces[];

  @OneToMany(() => TempSurface, (tempSurface) => tempSurface.surfaceType)
  tempSurfaces: TempSurface[];




  @OneToMany(() => RequestEditSurface, (requestEditSurface) => requestEditSurface.surfaceType)
  requestEditSurfaces: RequestEditSurface[];

  
}

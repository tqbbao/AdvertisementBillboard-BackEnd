import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { FormReport } from './form-report.entity';
import { Surfaces } from './surfaces.entity';

@Entity({ name: 'report_surface' })
export class ReportSurface {
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

  @Column('varchar', { name: 'email', length: 45 })
  email: string;

  @Column('varchar', { name: 'phone', length: 15 })
  phone: string;

  @Column('longtext', { name: 'content' })
  content: string;

  @Column('varchar', { name: 'img_url', length: 255, nullable: true })
  imgUrl: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'last_update', type: 'timestamp' })
  lastUpdate: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date;

  @ManyToOne(() => FormReport, (formReport) => formReport.reportSurfaces, {
    eager: true,
  })
  formReport: FormReport;

  @ManyToOne(() => Surfaces, (surface) => surface.reportSurfaces, {
    eager: true,
  })
  surface: Surfaces;
}

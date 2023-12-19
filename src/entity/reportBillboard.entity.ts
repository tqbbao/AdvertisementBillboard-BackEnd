import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { FormReport } from './form-report.entity';
import { Surfaces } from './surfaces.entity';

@Entity({ name: 'report_billboard' })
export class ReportBillboard {
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

  @Column('varchar', { unique: true, name: 'email', length: 45 })
  email: string;

  @Column('varchar', { name: 'phone', length: 15 })
  phone: string;

  @Column('longtext', { name: 'content' })
  content: string;

  @Column('varchar', { name: 'img_url', length: 255, nullable: true })
  imgUrl: string;

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

  @ManyToOne(() => FormReport, (formReport) => formReport.reportBillboards, {
    eager: true,
  })
  formReport: FormReport;

  @ManyToOne(() => Surfaces, (surface) => surface.reportBillboards, {
    eager: true,
  })
  surface: Surfaces;
}

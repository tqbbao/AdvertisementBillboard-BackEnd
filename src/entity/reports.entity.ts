import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FormReport } from './form-report.entity';

@Entity({ name: 'reports' })
export class Reports {
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

  // @ManyToOne(() => FormReport, (formReport) => formReport.reports, {
  //   eager: true,
  // })
  // formReport: FormReport;


}

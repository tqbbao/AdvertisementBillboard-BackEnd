import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Reports } from './reports.entity';
import { ReportLocation } from './reportLocation.entity';
import { ReportBillboard } from './reportBillboard.entity';


// Loại Report
@Entity({ name: 'form_report' })
export class FormReport {
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

  // @OneToMany(() => Reports, report => report.formReport)
  // reports: Reports[];

  @OneToMany(() => ReportLocation, reportLocation => reportLocation.formReport)
  reportLocations: ReportLocation[];

  @OneToMany(() => ReportBillboard, reportBillboard => reportBillboard.formReport)
  reportBillboards: ReportBillboard[];


}

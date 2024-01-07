import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Spaces } from './spaces.entity';
import { FormReport } from './form-report.entity';
import { ReportState } from 'src/common/enums/report-state.enum';

@Entity({ name: 'report_space' })
export class ReportSpace {
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
  
  @Column({ type: 'enum', enum: ReportState, default: ReportState.PENDING })
  state: ReportState;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'last_update', type: 'timestamp' })
  lastUpdate: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date;

  @ManyToOne(() => FormReport, (formReport) => formReport.reportSpaces, {
    eager: true,
  })
  formReport: FormReport;

  @ManyToOne(() => Spaces, (space) => space.reportSpaces, {eager: true, nullable: true })
  space: Spaces;


  
}

import { RequestState } from 'src/common/enums/request-state.enum';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'request_edit_surface' })
export class RequestEditSurface {
  @PrimaryGeneratedColumn({
    type: 'smallint',
    name: 'id',
    unsigned: true,
  })
  id: number;

  //Lý do chỉnh sửa
  @Column('longtext', { name: 'reason' })
  reason: string;

  @Column({ type: 'enum', enum: RequestState, default: RequestState.PENDING })
  state: RequestState;



  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'last_update', type: 'timestamp' })
  lastUpdate: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date;
}

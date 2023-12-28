import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Spaces } from './spaces.entity';
import { SpaceZone } from 'src/common/enums/space-zone.enum';
import { FormAdvertising } from './form-advertising.entity';
import { LocationTypes } from './location-types.entity';
import { Wards } from './wards.entity';

@Entity({ name: 'pending_edit_space' })
export class PendingSpace {
  








}

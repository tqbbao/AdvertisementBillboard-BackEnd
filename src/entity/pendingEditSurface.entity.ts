import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SurfaceTypes } from './surface-types.entity';
import { Spaces } from './spaces.entity';
import { Surfaces } from './surfaces.entity';

@Entity({ name: 'pending_edit_surface' })
export class PendingSurface {
  
}

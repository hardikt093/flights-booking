import { instanceToPlain } from 'class-transformer';
import { BaseEntity, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

export class EntityHelper extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  toJSON() {
    return instanceToPlain(this);
  }
}

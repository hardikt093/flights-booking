import { Entity, Column, ManyToOne } from 'typeorm';
import { EntityHelper } from '../utils/entity-helper';
import { IsNumber, IsString } from 'class-validator';
import { AllUsers } from './all-users.entity';
import { Exclude } from 'class-transformer';

@Entity('flights')
export class Flight extends EntityHelper {
  @Column({ nullable: false })
  @IsString()
  name: string;

  @Column({ nullable: false })
  @IsString()
  from: string;

  @Column({ nullable: false })
  @IsString()
  to: string;

  @Column({ nullable: false })
  @IsString()
  departure: string;

  @Column({ nullable: false })
  @IsString()
  return: string;

  @ManyToOne(() => AllUsers, (allUser) => allUser)
  allUsers: AllUsers;

  @Column({ nullable: false })
  @IsString()
  image: string;

  @Column({ nullable: false, default: 0 })
  @IsNumber()
  bookedCount: number;
}

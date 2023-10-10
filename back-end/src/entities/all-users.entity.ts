import { Entity, Column, Index, ManyToOne } from 'typeorm';
import { EntityHelper } from '../utils/entity-helper';
import { IsEmail, IsString } from 'class-validator';
import { UserRole } from './user-role.entity';
import { Exclude } from 'class-transformer';

@Entity('allUsers')
export class AllUsers extends EntityHelper {
  @Column({ nullable: false })
  @IsString()
  name: string;

  @Index('email_index')
  @Column({ unique: true, nullable: false })
  @IsEmail()
  email: string;

  @ManyToOne(() => UserRole, (userRole) => userRole.allUsers, { eager: true })
  userRole: UserRole;

  @Column({ nullable: false })
  @IsString()
  @Exclude()
  password: string;
}

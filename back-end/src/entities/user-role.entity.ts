import { Entity, Column, OneToMany } from 'typeorm';
import { EntityHelper } from '../utils/entity-helper';
import { IsString } from 'class-validator';
import { AllUsers } from './all-users.entity';

@Entity('userRoles')
export class UserRole extends EntityHelper {
  @Column({ unique: true, nullable: false })
  @IsString()
  name: string;

  @OneToMany(() => AllUsers, (allUsers) => allUsers.userRole)
  allUsers: AllUsers[];
}

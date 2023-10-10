import { Entity, Column, ManyToOne } from 'typeorm';
import { EntityHelper } from '../utils/entity-helper';
import { IsBoolean, IsDate, IsString } from 'class-validator';
import { AllUsers } from './all-users.entity';
import tokenTypes from '../utils/types/token.types';

@Entity('tokens')
export class Token extends EntityHelper {
  @Column({ nullable: false })
  @IsString()
  token: string;

  @Column({ nullable: false, type: 'enum', enum: [tokenTypes.REFRESH] })
  @IsString()
  type: string;

  @Column({ nullable: false })
  @IsDate()
  expires: Date;

  @Column({ nullable: false })
  @IsBoolean()
  blacklisted: boolean;

  @ManyToOne(() => AllUsers, (allUser) => allUser, { eager: true })
  allUsers: AllUsers;
}

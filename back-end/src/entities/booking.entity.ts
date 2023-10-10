import { Entity, ManyToOne } from 'typeorm';
import { EntityHelper } from '../utils/entity-helper';
import { AllUsers } from './all-users.entity';
import { Flight } from './flight.entity';

@Entity('bookings')
export class Booking extends EntityHelper {
  @ManyToOne(() => AllUsers, (allUsers) => allUsers.id, { eager: true })
  allUsers: AllUsers;

  @ManyToOne(() => Flight, (flight) => flight.id, { eager: true })
  flight: Flight;
}

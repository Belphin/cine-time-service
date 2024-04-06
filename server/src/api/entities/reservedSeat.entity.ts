import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from 'typeorm';
import { Session } from './session.entity';
import { Seat } from './seat.entity';

@Entity()
export class ReservedSeat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, select: false })
  visitor_email: string;

  @ManyToOne(() => Session, (session) => session.reservedSeats)
  @JoinColumn({ name: 'session_id' })
  session: Session;

  @ManyToOne(() => Seat, (seat) => seat.reservations)
  @JoinColumn({ name: 'seat_id' })
  seat: Seat;

  constructor(session: Session, seat: Seat) {
    this.session = session;
    this.seat = seat;
  }
}

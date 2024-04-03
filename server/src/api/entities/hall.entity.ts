import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Seat } from './seat.entity';
import { Session } from './session.entity';

@Entity()
export class Hall {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => Seat, (seat) => seat.hall)
  seats: Seat[];

  @OneToMany(() => Session, (session) => session.hall)
  sessions: Session[];
}

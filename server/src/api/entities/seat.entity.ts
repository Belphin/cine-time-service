import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Hall } from './hall.entity';
import { ReservedSeat } from './reservedSeat.entity';

@Entity()
export class Seat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  row: number;

  @Column()
  number: number;

  @ManyToOne(() => Hall, (hall) => hall.seats)
  @JoinColumn({ name: 'hall_id' })
  hall: Hall;

  @OneToMany(() => ReservedSeat, (reservedSeat) => reservedSeat.seat)
  reservations: ReservedSeat[];

  constructor(hall: Hall) {
    this.hall = hall;
  }
}

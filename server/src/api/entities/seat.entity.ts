import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Hall } from './hall.entity';

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

  constructor(hall: Hall) {
    this.hall = hall;
  }
}

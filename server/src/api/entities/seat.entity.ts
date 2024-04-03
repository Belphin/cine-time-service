import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
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
  hall: Hall;
}

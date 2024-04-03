import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Movie } from './movie.entity';
import { Hall } from './hall.entity';

@Entity()
export class Session {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  dateTime: Date;

  @ManyToOne(() => Hall, (hall) => hall.sessions)
  hall: Hall;

  @ManyToOne(() => Movie, (movie) => movie.sessions)
  movie: Movie;
}

import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Movie } from './movie.entity';
import { Hall } from './hall.entity';
import { ReservedSeat } from './reservedSeat.entity';

@Entity()
export class Session {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  session_date: Date;

  @Column({ type: 'time' })
  start_time: string;

  @Column({ type: 'time' })
  end_time: string;

  @ManyToOne(() => Hall, (hall) => hall.sessions)
  @JoinColumn({ name: 'hall_id' })
  hall: Hall;

  @ManyToOne(() => Movie, (movie) => movie.sessions)
  @JoinColumn({ name: 'movie_id' })
  movie: Movie;

  @OneToMany(() => ReservedSeat, (reservedSeat) => reservedSeat.session)
  reservedSeats: ReservedSeat[];

  constructor(hall: Hall, movie: Movie, startTime: string, endTime: string) {
    this.hall = hall;
    this.movie = movie;
  }
}

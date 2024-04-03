import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Session } from './session.entity';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  year: number;

  @OneToMany(() => Session, (session) => session.movie)
  sessions: Session[];
}

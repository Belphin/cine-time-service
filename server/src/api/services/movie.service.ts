import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from 'src/api/entities/movie.entity';
import { SeatReservationDto } from '../dto/seat-reservation.dto';
import { ReservedSeat } from '../entities/reservedSeat.entity';
import { Session } from '../entities/session.entity';
import { Seat } from '../entities/seat.entity';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
    @InjectRepository(ReservedSeat)
    private readonly reservedSeatRepository: Repository<ReservedSeat>,
    @InjectRepository(Session)
    private readonly sessionRepository: Repository<Session>,
    @InjectRepository(Seat)
    private readonly seatRepository: Repository<Seat>
  ) {}

  async getMovies(): Promise<Movie[]> {
    return this.movieRepository.find({
      relations: ['sessions', 'sessions.hall', 'sessions.hall.seats', 'sessions.reservedSeats']
    });
  }

  async getMovieSessions(movieId: number) {
    const movie = await this.movieRepository.findOne({
      where: { id: movieId },
      relations: [
        'sessions',
        'sessions.hall',
        'sessions.movie',
        'sessions.hall.seats',
        'sessions.reservedSeats',
        'sessions.reservedSeats.seat'
      ]
    });
    if (!movie) {
      throw new HttpException('Movie not found', HttpStatus.BAD_REQUEST);
    }

    return movie.sessions;
  }

  async reserveSeat(reservationDto: SeatReservationDto): Promise<ReservedSeat> {
    const { sessionId, seatId, visitorEmail } = reservationDto;

    // Check if the session exists
    const session = await this.sessionRepository.findOne({ where: { id: sessionId }, relations: ['hall'] });
    if (!session) {
      throw new HttpException('Session not found', HttpStatus.BAD_REQUEST);
    }

    // Check if the session's hall is valid
    if (!session.hall || !session.hall.id) {
      throw new HttpException('Hall not found for the session', HttpStatus.NOT_FOUND);
    }

    // Check if the seat exists
    const seat = await this.seatRepository.findOne({
      where: { id: seatId, hall: { id: session.hall.id } },
      relations: ['hall']
    });
    if (!seat) {
      throw new HttpException('Seat not found', HttpStatus.BAD_REQUEST);
    }

    // Check if the seat is already reserved
    const currentReservedSeat = await this.reservedSeatRepository.findOne({
      where: { session: { id: sessionId }, seat: { id: seatId } },
      relations: ['seat', 'session']
    });

    if (currentReservedSeat) {
      throw new HttpException('Seat is already reserved by someone', HttpStatus.BAD_REQUEST);
    }

    // Create a new reservedSeat
    const reservedSeat = this.reservedSeatRepository.create({
      session,
      seat,
      visitor_email: visitorEmail
    });

    return await this.reservedSeatRepository.save(reservedSeat);
  }
}

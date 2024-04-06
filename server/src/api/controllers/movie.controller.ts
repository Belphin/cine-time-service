import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Session } from 'src/api/entities/session.entity';
import { MovieService } from 'src/api/services/movie.service';
import { SeatReservationDto } from 'src/api/dto/seat-reservation.dto';

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  async getMovies() {
    return this.movieService.getMovies();
  }

  @Get(':id/sessions')
  async GetMovieSessions(@Param('id') movieId: string): Promise<Session[]> {
    return this.movieService.getMovieSessions(parseInt(movieId, 10));
  }

  @Post('seatReservation')
  async reserveSeat(@Body() reservationDto: SeatReservationDto) {
    const reservedSeat = await this.movieService.reserveSeat(reservationDto);
    return reservedSeat;
  }
}

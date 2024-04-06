import { Controller, Get, Param } from '@nestjs/common';
import { Session } from 'src/api/entities/session.entity';
import { MovieService } from 'src/api/services/movie.service';

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
}

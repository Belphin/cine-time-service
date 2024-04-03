import { Body, Controller, Get, Post } from '@nestjs/common';
import { MovieService } from '../services/movie.service';
import { Movie } from '../entities/movie.entity';

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  async getMovies() {
    return this.movieService.getMovies();
  }

  @Post()
  async createMovie(@Body() movie: Movie) {
    return this.movieService.createMovie(movie);
  }
}

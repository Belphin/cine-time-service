import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from 'src/api/entities/movie.entity';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>
  ) {}

  async getMovies(): Promise<Movie[]> {
    return this.movieRepository.find({ relations: ['sessions', 'sessions.hall', 'sessions.hall.seats'] });
  }

  async getMovieSessions(movieId: number) {
    const movie = await this.movieRepository.findOne({
      where: { id: movieId },
      relations: ['sessions', 'sessions.hall', 'sessions.movie', 'sessions.hall.seats']
    });
    if (!movie) {
      throw new Error('Movie not found');
    }
    return movie.sessions;
  }
}

import { Module } from '@nestjs/common';
import { MovieController } from './controllers/movie.controller';
import { MovieService } from './services/movie.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './entities/movie.entity';

@Module({ imports: [TypeOrmModule.forFeature([Movie])], controllers: [MovieController], providers: [MovieService] })
export class ApiModule {}

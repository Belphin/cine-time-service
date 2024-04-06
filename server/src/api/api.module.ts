import { Module } from '@nestjs/common';
import { MovieController } from 'src/api/controllers/movie.controller';
import { MovieService } from 'src/api/services/movie.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from 'src/api/entities/movie.entity';

@Module({ imports: [TypeOrmModule.forFeature([Movie])], controllers: [MovieController], providers: [MovieService] })
export class ApiModule {}

import { Module } from '@nestjs/common';
import { MovieController } from 'src/api/controllers/movie.controller';
import { MovieService } from 'src/api/services/movie.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from 'src/api/entities/movie.entity';
import { ReservedSeat } from 'src/api/entities/reservedSeat.entity';
import { Seat } from './entities/seat.entity';
import { Session } from './entities/session.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Movie, Seat, Session, ReservedSeat])],
  controllers: [MovieController],
  providers: [MovieService]
})
export class ApiModule {}

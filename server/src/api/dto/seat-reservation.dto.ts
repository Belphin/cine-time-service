import { IsInt, IsEmail } from 'class-validator';

export class SeatReservationDto {
  @IsInt()
  sessionId: number;

  @IsInt()
  seatId: number;

  @IsEmail()
  visitorEmail: string;
}

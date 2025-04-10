import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { Reservation } from './reservation.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reservation]),
    HttpModule,
    ConfigModule
],
  providers: [ReservationService],
  controllers: [ReservationController]
})
export class ReservationModule {}

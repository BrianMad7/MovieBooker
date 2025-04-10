import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NewReservationDto } from './new-reservation.dto';
import { Reservation } from './reservation.entity';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ReservationService {
    private apiKey: string;
    
    constructor(
        @InjectRepository(Reservation)
        private reservationRepository: Repository<Reservation>,
        private htppService: HttpService,
        private readonly config: ConfigService,
    ) {
        this.apiKey = this.config.get<string>('API_KEY')!;
    }

    async newReservation(newReservationDto: NewReservationDto, userId: number) {

        try {
            const movie = await firstValueFrom(this.htppService.get(
                `https://api.themoviedb.org/3/movie/${newReservationDto.movieId}`,
                {
                    headers: {
                        Authorization: `Bearer ${this.apiKey}`
                    },
                },
            ))
        } catch (error){
            throw new BadRequestException('Movie not found');
        }

        const reservationDate = new Date(newReservationDto.reservationDate);
        const existingReservations = await this.reservationRepository.findBy({user: {id: userId}});

        existingReservations.forEach((reservation) => {
            const currentReservation = new Date(reservation.reservationDate)
            if (reservationDate.getTime() < (currentReservation.getTime() + 7200000)) {
                throw new BadRequestException(`Your reservation must be 2 hours after this reservation : ${currentReservation}}`)
            }
        })

        const finalReservation = this.reservationRepository.create({
            reservationDate,
            movieId: newReservationDto.movieId,
            user: { id: userId }
        });

        return await this.reservationRepository.save(finalReservation);
    }

    async getReservations(userId: number) {
        return await this.reservationRepository.findBy({user: {id: userId}})
    }

    async deleteReservation(reservationId: number, userId: number) {
        const findReservation = await this.reservationRepository.findOne({
            where:
            {id: reservationId},
            relations: {user: true}
        });

        if (!findReservation) {
            throw new BadRequestException('reservation not found');
        }

        if (findReservation.user.id !== userId) {
            throw new UnauthorizedException('You are not allowed to delete this reservation')
        }

        return await this.reservationRepository.delete(reservationId);
    }
}

import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { NewReservationDto } from './new-reservation.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtSecretRequestType } from '@nestjs/jwt';

@ApiTags('Reservation')
@Controller('reservation')
export class ReservationController {
    constructor(private reservationService: ReservationService) {}

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create a new reservation'})
    @Post('/newReservation')
    @ApiCreatedResponse({ description: "Create a reservation"})
    async newReservation(
        @Body() newReservationDto: NewReservationDto,
        @Request() req: { user: {sub : number}}
    ) {
        return await this.reservationService.newReservation(newReservationDto, req.user.sub)
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get all reservations for connected User'})
    @Get('/')
    async getReservations(
        @Request() req: { user: {sub : number}}
    )  {
        return await this.reservationService.getReservations(req.user.sub)
    }
}

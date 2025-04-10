import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { NewReservationDto } from './new-reservation.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth, ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Reservation')
@Controller('reservation')
export class ReservationController {
    constructor(private reservationService: ReservationService) {}

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Login function'})
    @Post('/newReservation')
    @ApiCreatedResponse({ description: "Create a reservation"})
    async newReservation(
        @Body() newReservationDto: NewReservationDto,
        @Request() req: { user: {sub : number}}
    ) {
        return await this.reservationService.newReservation(newReservationDto, req.user.sub)
    }
}

import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNumber } from "class-validator";

export class NewReservationDto {

    @ApiProperty({ description: "Movie's Id"})
    movieId: number;

    @ApiProperty({ description: "Date of user's reservation"})
    @IsDateString()
    reservationDate: Date;
}
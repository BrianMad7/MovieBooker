import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsDateString, IsEmail, IsString } from "class-validator";

export class RegisterDto {

    @ApiProperty()
    @IsString()
    username: string;

    @ApiProperty( {description: "Birthdate in YYYY-MM-DD format"})
    @IsDateString()
    birthdate: Date;

    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsString()
    password: string;
}
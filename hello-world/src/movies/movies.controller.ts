import { Controller, Get } from '@nestjs/common';
import { MoviesService } from './movies.services';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Movies')
@Controller('movies')
export class MoviesController {
    constructor(private readonly moviesServices: MoviesService) {}

    @ApiOperation({ summary: "Get all movies that are currently in theaters"})
    @Get('/onAir')
    getMoviesOnAir() {
        return this.moviesServices.getMoviesOnAir();
    }
}

import { Controller, Get, Query } from '@nestjs/common';
import { MoviesService } from './movies.services';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('Movies')
@Controller('movies')
export class MoviesController {
    constructor(private readonly moviesServices: MoviesService) {}

    @ApiOperation({ summary: "Get all movies that are currently in theaters"})
    @ApiQuery({name: 'page', required: false})
    @Get('/onAir')
    getMoviesOnAir(
        @Query('page') page?: number,
    ) {
        return this.moviesServices.getMoviesOnAir({page});
    }
}

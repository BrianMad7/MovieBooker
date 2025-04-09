import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AxiosResponse } from "axios";
import { firstValueFrom, map, Observable } from "rxjs";

@Injectable()
export class MoviesService {
    private apiKey: string;
    private baseUrl: string;

    constructor(
        private readonly httpService: HttpService,
        private readonly config: ConfigService,
    ) {
        this.baseUrl = this.config.get<string>('API_URL')!;
        this.apiKey = this.config.get<string>('API_KEY')!;
    }

    async getMoviesOnAir(params : {
        page?: number;
        search?: string;
        sort?: string;
    }): Promise<AxiosResponse<any>> {

        const {page = 1, search, sort} = params;
        let url: string;

        if (search) {
            // https://developer.themoviedb.org/reference/search-movie
            url = `${this.baseUrl}/search/movie?query=${encodeURIComponent(search)}&language=fr-FR`;
        } else {
            // https://developer.themoviedb.org/reference/movie-now-playing-list
            url = `${this.baseUrl}/movie/now_playing?language=fr-FR&page=${page}`;
        }

        if (sort === 'popularity') {
            url = `${this.baseUrl}/movie/popular?language=fr-FR`;
        } else if (sort === 'top_rated') {
            url = `${this.baseUrl}/movie/top_rated?language=fr-FR`;
        }
        
        return await firstValueFrom(this.httpService.get(url, {
            headers: {
                Authorization: `Bearer ${this.apiKey}` 
            },
        }
    ).pipe(map(response => response.data)))
}
}
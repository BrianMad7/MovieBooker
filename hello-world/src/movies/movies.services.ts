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
        page?: number;}): Promise<AxiosResponse<any>> {
            const {page = 1} = params;
        // https://developer.themoviedb.org/reference/movie-now-playing-list
        const url = `${this.baseUrl}/movie/now_playing?language=fr-FR&page=${page}`;
        
        return await firstValueFrom(this.httpService.get(url, {
            headers: {
                Authorization: `Bearer ${this.apiKey}` 
            },
        }
    ).pipe(map(response => response.data)))
}
}
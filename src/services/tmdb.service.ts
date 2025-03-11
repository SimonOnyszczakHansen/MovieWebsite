import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class TmdbService {
    private apiUrl = 'https://api.themoviedb.org/3';

    constructor(private http: HttpClient) { }

    getTrendingMovies(timeWindow: 'day' | 'week'): Observable<any> {
        return this.http.get(`${this.apiUrl}/trending/movie/${timeWindow}?api_key=${environment.apiKey}`);
    }

    getMovieDetails(movieId: number) {
        return this.http.get(`${this.apiUrl}/movie/${movieId}?api_key=${environment.apiKey}`)
    }

    getMovieVideos(movieId: number): Observable<any> {
        return this.http.get(`${this.apiUrl}/movie/${movieId}/videos?api_key=${environment.apiKey}`)
    }

    getMovieCredits(movieId: number): Observable<any> {
        return this.http.get(`${this.apiUrl}/movie/${movieId}/credits?api_key=${environment.apiKey}`)
    }
}
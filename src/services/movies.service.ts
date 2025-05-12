import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class MoviesService {
    constructor(private http: HttpClient) { }

    getMovieDetails(movieId: number): Observable<any> {
        return this.http.get(`${environment.apiUrl}/movie/${movieId}?api_key=${environment.apiKey}`);
    }

    getMovieVideos(movieId: number): Observable<any> {
        return this.http.get(`${environment.apiUrl}/movie/${movieId}/videos?api_key=${environment.apiKey}`);
    }

    getMovieCredits(movieId: number): Observable<any> {
        return this.http.get(`${environment.apiUrl}/movie/${movieId}/credits?api_key=${environment.apiKey}`);
    }

    getMoviesDiscover(pageNumber: number): Observable<any> {
        return this.http.get(`${environment.apiUrl}/discover/movie?api_key=${environment.apiKey}&page=${pageNumber}`)
    }

    getTopRatedMovies(): Observable<any>{
        return this.http.get(`${environment.apiUrl}/movie/top_rated?api_key=${environment.apiKey}`)
    }
}
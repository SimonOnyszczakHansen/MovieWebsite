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

    getTrendingContent(timeWindow: 'day' | 'week'): Observable<any> {
        return this.http.get(`${this.apiUrl}/trending/all/${timeWindow}?api_key=${environment.apiKey}`);
    }

    getMovieDetails(movieId: number): Observable<any> {
        return this.http.get(`${this.apiUrl}/movie/${movieId}?api_key=${environment.apiKey}`);
    }

    getMovieVideos(movieId: number): Observable<any> {
        return this.http.get(`${this.apiUrl}/movie/${movieId}/videos?api_key=${environment.apiKey}`);
    }

    getMovieCredits(movieId: number): Observable<any> {
        return this.http.get(`${this.apiUrl}/movie/${movieId}/credits?api_key=${environment.apiKey}`);
    }

    getTvShowDetails(tvId: number): Observable<any> {
        return this.http.get(`${this.apiUrl}/tv/${tvId}?api_key=${environment.apiKey}`);
    }

    getTvShowVideos(tvId: number): Observable<any> {
        return this.http.get(`${this.apiUrl}/tv/${tvId}/videos?api_key=${environment.apiKey}`);
    }

    getTvShowCredits(tvId: number): Observable<any> {
        return this.http.get(`${this.apiUrl}/tv/${tvId}/credits?api_key=${environment.apiKey}`);
    }

    getPersonDetails(personId: number): Observable<any> {
        return this.http.get(`${this.apiUrl}/person/${personId}?api_key=${environment.apiKey}`)
    }

    getPersonCombinedCredits(personId: number): Observable<any> {
        return this.http.get(`${this.apiUrl}/person/${personId}/combined_credits?api_key=${environment.apiKey}`)
    }

    getMoviesDiscover(pageNumber: number): Observable<any> {
        return this.http.get(`${this.apiUrl}/discover/movie?api_key=${environment.apiKey}&page=${pageNumber}`)
    }

    searchMulti(query: string): Observable<any> {
        return this.http.get(
            `${this.apiUrl}/search/multi?api_key=${environment.apiKey}&query=${encodeURIComponent(query)}`
        );
    }

    getCombinedCredits(personId: number): Observable<any> {
        return this.http.get(`${this.apiUrl}/person/${personId}/combined_credits?api_key=${environment.apiKey}`);
    }
}
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

    getTrendingMovies(): Observable<any> {
        return this.http.get(`${this.apiUrl}/trending/movie/day?api_key=${environment.apiKey}`);
    }
}
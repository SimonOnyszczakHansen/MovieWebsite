import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class TmdbService {
    constructor(private http: HttpClient) { }

    getTrendingContent(timeWindow: 'day' | 'week'): Observable<any> {
        return this.http.get(`${environment.apiUrl}/trending/all/${timeWindow}?api_key=${environment.apiKey}`);
    }

    searchMulti(query: string): Observable<any> {
        return this.http.get(
            `${environment.apiUrl}/search/multi?api_key=${environment.apiKey}&query=${encodeURIComponent(query)}`
        );
    }
}
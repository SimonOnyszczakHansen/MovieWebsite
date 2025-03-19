import { Injectable } from "@angular/core";
import { environment } from "../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class TvService {
    constructor(private http: HttpClient) { }

    getTvShowDetails(tvId: number): Observable<any> {
        return this.http.get(`${environment.apiUrl}/tv/${tvId}?api_key=${environment.apiKey}`);
    }

    getTvShowVideos(tvId: number): Observable<any> {
        return this.http.get(`${environment.apiUrl}/tv/${tvId}/videos?api_key=${environment.apiKey}`);
    }

    getTvShowCredits(tvId: number): Observable<any> {
        return this.http.get(`${environment.apiUrl}/tv/${tvId}/credits?api_key=${environment.apiKey}`);
    }

    getTvShowDiscover(pageNumber: number): Observable<any> {
        return this.http.get(`${environment.apiUrl}/discover/tv?api_key=${environment.apiKey}&page=${pageNumber}`)
    }   
}
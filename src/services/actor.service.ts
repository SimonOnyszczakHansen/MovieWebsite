import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../environments/environment";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class ActorService {
    constructor(private http: HttpClient) {}

    getPersonDetails(personId: number): Observable<any> {
        return this.http.get(`${environment.apiUrl}/person/${personId}?api_key=${environment.apiKey}`)
    }

    getPersonCredits(personId: number): Observable<any> {
        return this.http.get(`${environment.apiUrl}/person/${personId}/credits?api_key=${environment.apiKey}`)
    }
}
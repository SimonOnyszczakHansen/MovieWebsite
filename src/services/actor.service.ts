import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../environments/environment";
import { Injectable } from "@angular/core";
import { map } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ActorService {
    constructor(private http: HttpClient) { }

    getPersonDetails(personId: number): Observable<any> {
        return this.http.get(`${environment.apiUrl}/person/${personId}?api_key=${environment.apiKey}`)
    }

    getPersonCredits(personId: number): Observable<any> {
        return this.http.get(`${environment.apiUrl}/person/${personId}/combined_credits?api_key=${environment.apiKey}`).pipe(
          map((response: any) => ({
            ...response,
            cast: response.cast.filter((entry: any) => 
              entry.media_type === 'movie' || 
              (entry.media_type === 'tv' && !entry.genre_ids?.includes(10767))
            ),
            crew: response.crew.filter((entry: any) => 
              entry.media_type === 'movie' || 
              (entry.media_type === 'tv' && !entry.genre_ids?.includes(10767))
            )
          }))
        );
      }
}
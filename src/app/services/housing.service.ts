import { inject, Injectable } from '@angular/core';
import { HousingLocation } from '../types/housinglocation';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HousingService {
  private readonly httpClient = inject(HttpClient);
  readonly url = 'http://localhost:3000/locations';

  getAllHousingLocations(): Observable<HousingLocation[]> {
    return this.httpClient
      .get<HousingLocation[]>(this.url)
      .pipe(map(response => response ?? []));
  }

  getHousingLocationById(id: number): Observable<HousingLocation | undefined> {
    return this.httpClient
      .get<HousingLocation>(`${this.url}/${id}`)
      .pipe(map(response => response ?? {}));
  }

  updateHousingLocationFavStatus(
    id: number,
    isFavourte: boolean
  ): Observable<HousingLocation> {
    return this.httpClient
      .patch<HousingLocation>(`${this.url}/${id}`, { favourite: isFavourte })
      .pipe(map(response => response ?? {}));
  }

  submitApplication(firstName: string, lastName: string, email: string) {
    console.log(
      `Homes application received: firstName: ${firstName}, lastName: ${lastName}, email: ${email}.`
    );
  }
}

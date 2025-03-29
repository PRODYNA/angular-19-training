import { inject, Injectable } from '@angular/core';
import { HousingLocation } from '../types/housinglocation';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of, switchMap, throwError } from 'rxjs';

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

  getHousingLocationsFiltered(
    searchTerm: string
  ): Observable<HousingLocation[]> {
    return this.getAllHousingLocations().pipe(
      map(housingLocations => this.filterResults(searchTerm, housingLocations))
    );
  }

  // Same as getHousingLocationsFiltered but returns an error observable every third time
  getHousingLocationsFilteredWithErrors(
    searchTerm: string
  ): Observable<HousingLocation[]> {
    return this.getHousingLocationsFiltered(searchTerm).pipe(
      switchMap(housingLocations => {
        if (housingLocations.length % 3 === 0) {
          return throwError(() => new Error('Error occurred'));
        }
        return of(housingLocations);
      })
    );
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

  private filterResults(
    searchTerm: string,
    housingLocations: HousingLocation[]
  ): HousingLocation[] {
    if (!searchTerm) {
      return housingLocations;
    }

    return housingLocations.filter(housingLocation =>
      housingLocation?.city.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
}

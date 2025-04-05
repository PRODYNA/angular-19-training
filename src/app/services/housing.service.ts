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

  // TODO Hands-on-3: create a new method update the favourite status of a housing location
  // the REST API of db.json-server is like: PATCH <url>/:id
  // and the patch-body as usual is a part of interface HousingLocation you want to patch
  // the methods should return an observable of type HousingLocation

  submitApplication(firstName: string, lastName: string, email: string) {
    console.log(
      `Homes application received: firstName: ${firstName}, lastName: ${lastName}, email: ${email}.`
    );
  }
}

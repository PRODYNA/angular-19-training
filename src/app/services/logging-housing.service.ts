import { Injectable } from '@angular/core';
import { HousingService } from './housing.service';
import { Observable } from 'rxjs';
import { HousingLocation } from '../types/housinglocation';

@Injectable()
export class LoggingHousingService extends HousingService {
  override getAllHousingLocations(): Observable<HousingLocation[]> {
    console.log('getAllHousingLocations called');
    return super.getAllHousingLocations();
  }

  override getHousingLocationsFiltered(
    searchTerm: string
  ): Observable<HousingLocation[]> {
    console.log(
      'getHousingLocationsFiltered called with searchTerm:',
      searchTerm
    );
    return super.getHousingLocationsFiltered(searchTerm);
  }

  override getHousingLocationsFilteredWithErrors(
    searchTerm: string
  ): Observable<HousingLocation[]> {
    console.log(
      'getHousingLocationsFilteredWithErrors called with searchTerm:',
      searchTerm
    );
    return super.getHousingLocationsFilteredWithErrors(searchTerm);
  }

  override getHousingLocationById(
    id: number
  ): Observable<HousingLocation | undefined> {
    console.log('getHousingLocationById called with id:', id);
    return super.getHousingLocationById(id);
  }

  override updateHousingLocationFavStatus(
    id: number,
    isFavourte: boolean
  ): Observable<HousingLocation> {
    console.log(
      'updateHousingLocationFavStatus called with id:',
      id,
      'and isFavourte:',
      isFavourte
    );
    return super.updateHousingLocationFavStatus(id, isFavourte);
  }

  override submitApplication(
    firstName: string,
    lastName: string,
    email: string
  ) {
    console.log(
      'submitApplication called with firstName:',
      firstName,
      'lastName:',
      lastName,
      'email:',
      email
    );
    super.submitApplication(firstName, lastName, email);
  }
}

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingService } from '../../services/housing.service';
import { HousingLocation } from '../../types/housinglocation';
import { BehaviorSubject, catchError, of, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HousingLocationComponent],
  template: `
    <section>
      <form>
        <input
          type="text"
          placeholder="Filter by city"
          #filter
          (input)="onInputChange($event)"
        />
      </form>
    </section>
    <section class="results">
      @for (housingLocation of housingLocationList; track housingLocation.id) {
        <app-housing-location [housingLocation]="housingLocation">
        </app-housing-location>
      }
    </section>
  `,
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  housingLocationList: HousingLocation[] = [];
  housingService: HousingService = inject(HousingService);

  private searchTermSubject: BehaviorSubject<string> =
    new BehaviorSubject<string>('');

  constructor() {
   this.searchTermSubject
      .pipe(
        switchMap(searchTerm =>
          this.housingService
            .getHousingLocationsFilteredWithErrors(searchTerm)
            .pipe(
              catchError(err => {
                console.error('Error fetching locations:', err);
                return of([]);
              })
            )
        ),
        tap({
          subscribe: () => {
            console.log('search subscribed');
          },
          next: locations => {
            console.log('search locations', locations);
          },
          error: err => {
            console.error('search error', err);
          },
          complete: () => {
            console.log('search completed');
          },
          unsubscribe: () => {
            console.log('search unsubscribed');
          },
        })
      )
      .subscribe((filteredLocations: HousingLocation[]) => {
        this.housingLocationList = filteredLocations;
      });
  }

  onInputChange(inputChange: Event) {
    const searchTerm = (inputChange.target as HTMLInputElement).value;
    this.searchTermSubject.next(searchTerm);
  }
}

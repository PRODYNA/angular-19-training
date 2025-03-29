import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingService } from '../../services/housing.service';
import { HousingLocation } from '../../types/housinglocation';
import { BehaviorSubject } from 'rxjs';

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
    // TODO hands-on-4: use the searchTermSubject stream and new this.housingService.getHousingLocationsFiltered(searchTerm) method
    // to get the housing locations filtered by the search term
    // and assign the result to housingLocationList in a subscribe
  }

  onInputChange(inputChange: Event) {
    const searchTerm = (inputChange.target as HTMLInputElement).value;
    // TODO hands-on-4: pump the value into the BehaviorSubject
  }
}

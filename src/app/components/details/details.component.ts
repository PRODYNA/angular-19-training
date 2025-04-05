import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../../services/housing.service';
import { HousingLocation } from '../../types/housinglocation';
import { ReactiveFormsModule } from '@angular/forms';
import { ListingApplyComponent } from '../listing-apply/listing-apply.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ListingApplyComponent],
  template: `
    <article>
      <img
        class="listing-photo"
        [src]="housingLocation?.photo"
        alt="Exterior photo of {{ housingLocation?.name }}"
      />
      <section class="listing-description">
        <h2 class="listing-heading">{{ housingLocation?.name }}</h2>
        <p class="listing-location">
          {{ housingLocation?.city }}, {{ housingLocation?.state }}
        </p>
      </section>
      <section class="listing-features">
        <h2 class="section-heading">About this housing location</h2>
        <ul>
          <li>Units available: {{ housingLocation?.availableUnits }}</li>
          <li>Does this location have wifi: {{ housingLocation?.wifi }}</li>
          <li>
            Does this location have laundry: {{ housingLocation?.laundry }}
          </li>
        </ul>
      </section>
      <section class="listing-apply"><app-listing-apply /></section>
    </article>
  `,
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent {
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  private readonly housingService = inject(HousingService);

  housingLocation: HousingLocation | undefined;

  constructor() {
    this.getHousingLocation().subscribe(housingLocation => {
      this.housingLocation = housingLocation;
    });
  }

  private getHousingLocation(): Observable<HousingLocation | undefined> {
    const housingLocationId = parseInt(this.route.snapshot.params['id'], 10);
    return this.housingService.getHousingLocationById(housingLocationId);
  }
}

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocation } from '../../types/housinglocation';
import { RouterModule } from '@angular/router';
import { AddToFavouritesComponent } from '../add-to-favourites/add-to-favourites.component';

@Component({
  selector: 'app-housing-location',
  standalone: true,
  imports: [CommonModule, RouterModule, AddToFavouritesComponent],
  template: `
    <section class="listing">
      <img
        class="listing-photo"
        [src]="housingLocation.photo"
        alt="Exterior photo of {{ housingLocation.name }}"
      />
      <h2 class="listing-heading">
        {{ housingLocation.name }}
        <app-add-to-favourites
          [housingId]="housingLocation.id"
          [isFavourite]="housingLocation.favourite"
        />
      </h2>

      <p class="listing-location">
        {{ housingLocation.city }}, {{ housingLocation.state }}
      </p>
      <a [routerLink]="['/details', housingLocation.id]">Learn More</a>
    </section>
  `,
  styleUrls: ['./housing-location.component.scss'],
})
export class HousingLocationComponent {
  @Input({ required: true }) housingLocation!: HousingLocation;
}

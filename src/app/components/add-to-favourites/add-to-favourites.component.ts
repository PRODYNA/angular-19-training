import { Component, inject, Input } from '@angular/core';
import { HousingService } from '../../services/housing.service';

@Component({
  selector: 'app-add-to-favourites',
  imports: [],
  template: `
    <button class="round-button centered-svg" (click)="update()">
      <svg
        width="25"
        height="25"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        @if (isFavourite) {
          <path
            d="M12 2L14.09 8.26L20.18 8.27L15.64 12.14L17.73 18.4L12 14.77L6.27 18.4L8.36 12.14L3.82 8.27L9.91 8.26L12 2Z"
            fill="#e6c809"
          />
        } @else {
          <path
            d="M12 2L14.09 8.26L20.18 8.27L15.64 12.14L17.73 18.4L12 14.77L6.27 18.4L8.36 12.14L3.82 8.27L9.91 8.26L12 2Z"
            stroke="#e6c809"
          />
        }
      </svg>
    </button>
  `,
  styleUrl: './add-to-favourites.component.scss',
})
export class AddToFavouritesComponent {
  private readonly housingService = inject(HousingService);

  @Input({ required: true }) housingId!: number;
  @Input() isFavourite: boolean = false;

  update() {
    // TODO Hands-on-3: call new method in housing service,
    // subscribe to the observable and update the isFavourite property in the subscribe
  }
}

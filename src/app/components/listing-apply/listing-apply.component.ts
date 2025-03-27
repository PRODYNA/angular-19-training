import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HousingService } from '../../services/housing.service';
import { HousingApplicationForm } from '../details/housing-application-form.type';

@Component({
  selector: 'app-listing-apply',
  imports: [ReactiveFormsModule],
  template: `
    <h2 class="section-heading">
      <span>Apply now to live here</span>
    </h2>
    <form [formGroup]="applyForm" (submit)="submitApplication()">
      <label for="first-name">First Name</label>
      <input id="first-name" type="text" formControlName="firstName" />

      <label for="last-name">Last Name</label>
      <input id="last-name" type="text" formControlName="lastName" />

      <label for="email">Email</label>
      <input id="email" type="email" formControlName="email" />
      <button type="submit" class="primary">Apply now</button>
    </form>
  `,
  styleUrl: './listing-apply.component.scss',
})
export class ListingApplyComponent {
  private readonly housingService = inject(HousingService);

  applyForm = this.createFormGroup();

  submitApplication() {
    this.housingService.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? ''
    );
  }

  private createFormGroup(): FormGroup<HousingApplicationForm> {
    return new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl(''),
    });
  }
}

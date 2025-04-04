import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListingApplyComponent } from './listing-apply.component';
import { HousingService } from '../../services/housing.service';

describe('ListingApplyComponent', () => {
  let component: ListingApplyComponent;
  let fixture: ComponentFixture<ListingApplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListingApplyComponent],
      providers: [{ provide: HousingService, useClass: MockHousingService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingApplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a form with three controls', () => {
    expect(component.applyForm.contains('firstName')).toBeTruthy();
    expect(component.applyForm.contains('lastName')).toBeTruthy();
    expect(component.applyForm.contains('email')).toBeTruthy();
  });

  it('should call housing service to submit application', () => {
    // Given
    component.applyForm.setValue({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
    });

    const housingService: MockHousingService = TestBed.inject(HousingService);
    const submitSpy = spyOn(housingService, 'submitApplication');

    // When
    component.submitApplication();

    // Then
    expect(submitSpy).toHaveBeenCalled();
    expect(submitSpy).toHaveBeenCalledWith(
      'John',
      'Doe',
      'john.doe@example.com'
    );
  });

  it('should call submit method on form submit', () => {
    // Given
    const submitSpy = spyOn(component, 'submitApplication');

    // When
    const form = fixture.nativeElement.querySelector('form');
    form.dispatchEvent(new Event('submit'));

    // Then
    expect(submitSpy).toHaveBeenCalled();
  });
});

class MockHousingService {
  public submitApplication(
    firstName: string,
    lastName: string,
    email: string
  ) {}
}

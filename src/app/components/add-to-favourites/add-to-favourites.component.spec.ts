import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddToFavouritesComponent } from './add-to-favourites.component';
import { HousingService } from '../../services/housing.service';
import { Observable, of } from 'rxjs';
import { HousingLocation } from '../../types/housinglocation';

describe('AddToFavouritesComponent', () => {
  let component: AddToFavouritesComponent;
  let fixture: ComponentFixture<AddToFavouritesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddToFavouritesComponent],
      providers: [{ provide: HousingService, useClass: MockHousingService }],
    }).compileComponents();

    fixture = TestBed.createComponent(AddToFavouritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call housing service to update fav status on button click', () => {
    // Given
    const housingService: MockHousingService = TestBed.inject(HousingService);
    const updateHousingLocationFavStatusSpy = spyOn(
      housingService,
      'updateHousingLocationFavStatus'
    );
    const housingId = 1;

    component.housingId = housingId;
    const button = fixture.nativeElement.querySelector('button');

    // When
    button.click();

    // Then
    expect(updateHousingLocationFavStatusSpy).toHaveBeenCalledWith(
      housingId,
      true
    );
  });

  it('should update value returned by service when update called', () => {
    // Given
    const housingService: MockHousingService = TestBed.inject(HousingService);
    spyOn(housingService, 'updateHousingLocationFavStatus').and.returnValue(
      of({ favourite: true } as HousingLocation)
    );
    const housingId = 1;

    component.housingId = housingId;

    // When
    component.update();

    // Then
    expect(component.isFavouriteSignal()).toBe(true);
  });
});

class MockHousingService {
  updateHousingLocationFavStatus(
    id: number,
    isFavourte: boolean
  ): Observable<HousingLocation> {
    return of();
  }
}

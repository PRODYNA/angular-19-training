import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListingApplyComponent } from './listing-apply.component';

describe('ListingApplyComponent', () => {
  let component: ListingApplyComponent;
  let fixture: ComponentFixture<ListingApplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListingApplyComponent],
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
});

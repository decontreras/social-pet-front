import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdoptionApplicationPage } from './adoptionApplication.page';

describe('AdoptionApplicationPage', () => {
  let component: AdoptionApplicationPage;
  let fixture: ComponentFixture<AdoptionApplicationPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AdoptionApplicationPage],
      imports: [IonicModule.forRoot(),]
    }).compileComponents();

    fixture = TestBed.createComponent(AdoptionApplicationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

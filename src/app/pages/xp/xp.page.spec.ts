import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { XpPage } from './xp.page';

describe('XpPage', () => {
  let component: XpPage;
  let fixture: ComponentFixture<XpPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XpPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(XpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

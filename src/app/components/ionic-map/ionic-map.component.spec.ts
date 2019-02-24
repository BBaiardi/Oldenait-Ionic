import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IonicMapComponent } from './ionic-map.component';

describe('IonicMapComponent', () => {
  let component: IonicMapComponent;
  let fixture: ComponentFixture<IonicMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IonicMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IonicMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

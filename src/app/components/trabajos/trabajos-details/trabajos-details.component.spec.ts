import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrabajosDetailsComponent } from './trabajos-details.component';

describe('TrabajosDetailsComponent', () => {
  let component: TrabajosDetailsComponent;
  let fixture: ComponentFixture<TrabajosDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrabajosDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrabajosDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

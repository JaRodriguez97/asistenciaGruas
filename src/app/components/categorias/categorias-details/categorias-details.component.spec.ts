import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriasDetailsComponent } from './categorias-details.component';

describe('CategoriasDetailsComponent', () => {
  let component: CategoriasDetailsComponent;
  let fixture: ComponentFixture<CategoriasDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriasDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriasDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

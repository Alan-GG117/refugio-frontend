import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionAcreedores } from './gestion-acreedores';

describe('GestionAcreedores', () => {
  let component: GestionAcreedores;
  let fixture: ComponentFixture<GestionAcreedores>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionAcreedores]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionAcreedores);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

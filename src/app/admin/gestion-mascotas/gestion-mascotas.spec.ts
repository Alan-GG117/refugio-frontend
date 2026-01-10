import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionMascotas } from './gestion-mascotas';

describe('GestionMascotas', () => {
  let component: GestionMascotas;
  let fixture: ComponentFixture<GestionMascotas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionMascotas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionMascotas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

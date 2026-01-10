import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MascotasDisponibles } from './mascotas-disponibles';

describe('MascotasDisponibles', () => {
  let component: MascotasDisponibles;
  let fixture: ComponentFixture<MascotasDisponibles>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MascotasDisponibles]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MascotasDisponibles);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

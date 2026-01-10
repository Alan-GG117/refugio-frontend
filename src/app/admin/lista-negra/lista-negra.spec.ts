import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaNegra } from './lista-negra';

describe('ListaNegra', () => {
  let component: ListaNegra;
  let fixture: ComponentFixture<ListaNegra>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaNegra]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaNegra);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovimentacaoDepositoComponent } from './movimentacao-deposito.component';

describe('MovimentacaoDepositoComponent', () => {
  let component: MovimentacaoDepositoComponent;
  let fixture: ComponentFixture<MovimentacaoDepositoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovimentacaoDepositoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovimentacaoDepositoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

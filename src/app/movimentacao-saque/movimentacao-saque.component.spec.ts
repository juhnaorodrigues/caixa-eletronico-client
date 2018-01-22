import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovimentacaoSaqueComponent } from './movimentacao-saque.component';

describe('MovimentacaoSaqueComponent', () => {
  let component: MovimentacaoSaqueComponent;
  let fixture: ComponentFixture<MovimentacaoSaqueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovimentacaoSaqueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovimentacaoSaqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

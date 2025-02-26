import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonAboutPage } from './pokemon-about.page';

describe('PokemonAboutPage', () => {
  let component: PokemonAboutPage;
  let fixture: ComponentFixture<PokemonAboutPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonAboutPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

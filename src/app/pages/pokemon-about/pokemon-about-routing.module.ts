import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PokemonAboutPage } from './pokemon-about.page';

const routes: Routes = [
  {
    path: '',
    component: PokemonAboutPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PokemonAboutPageRoutingModule {}

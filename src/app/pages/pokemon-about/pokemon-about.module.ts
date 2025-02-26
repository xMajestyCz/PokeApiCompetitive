import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PokemonAboutPageRoutingModule } from './pokemon-about-routing.module';

import { PokemonAboutPage } from './pokemon-about.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PokemonAboutPageRoutingModule
  ],
  declarations: [PokemonAboutPage]
})
export class PokemonAboutPageModule {}

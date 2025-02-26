import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { Router } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false
})
export class HomePage implements OnInit {
  pokemonList: any[] = [];
  filteredPokemon: any[] = [];
  searchTerm: string = '';

  constructor(private httpService: HttpService, private router: Router) {}

  ngOnInit() {
    this.httpService.getPokemonList().subscribe({
      next: (response: any) => {
        if (!response.results || response.results.length === 0) {
          console.error('No se recibieron resultados de la API.');
          return;
        }

        const requests: Observable<any>[] = response.results.map((pokemon: any) =>
          this.httpService.getPokemonDetails(pokemon.name)
        );

        forkJoin(requests).subscribe({
          next: (pokemonDetails: any[]) => {
            this.pokemonList = pokemonDetails;
            this.filteredPokemon = this.pokemonList;
            console.log('Pokémon cargados:', this.pokemonList);
          },
          error: (err) => {
            console.error('Error al obtener los detalles de los Pokémon:', err);
          }
        });
      },
      error: (err) => {
        console.error('Error al obtener la lista de Pokémon:', err);
      }
    });
  }

  filterPokemon() {
    this.filteredPokemon = this.pokemonList.filter(pokemon =>
      pokemon.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  goToDetail(name: string) {
    this.router.navigate(['/pokemon', name]);
  }
}

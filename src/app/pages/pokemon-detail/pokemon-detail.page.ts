import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.page.html',
  styleUrls: ['./pokemon-detail.page.scss'],
  standalone: false
})
export class PokemonDetailPage implements OnInit {
  pokemon: any;

  constructor(private route: ActivatedRoute, private httpService: HttpService, private router: Router) {}

  ngOnInit() {
    const name = this.route.snapshot.paramMap.get('name');
    if (name) {
      this.httpService.getPokemonDetails(name).subscribe((response) => {
        this.pokemon = response;
      });
    }
  }

  navigateToMoves() {
    const activeElement = document.activeElement as HTMLElement | null;
    if (activeElement) {
      activeElement.blur();
    }
    this.router.navigate(['/pokemon-about', this.pokemon.name]);
  }
  

  statMapping: { [key: string]: string } = {
    'hp': 'HP',
    'attack': 'ATK',
    'defense': 'DEF',
    'special-attack': 'SPA',
    'special-defense': 'SPD',
    'speed': 'SPE'
  };

  getStatColor(stat: number): string {
    if (stat >= 150) return '#00FF00'; 
    if (stat >= 120) return '#66CC00';
    if (stat >= 100) return '#CCCC00'; 
    if (stat >= 80)  return '#FF99';
    if (stat >= 50)  return '#FF5500'; 
    return '#FF0000'; 
  }
}

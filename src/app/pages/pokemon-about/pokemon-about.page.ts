import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';

interface MoveDetail {
  move_learn_method: { name: string };
}

interface MoveEntry {
  name: string;
  levelUp: boolean;
  tutor: boolean;
  mtmo: boolean;
}

@Component({
  selector: 'app-pokemon-about',
  templateUrl: './pokemon-about.page.html',
  styleUrls: ['./pokemon-about.page.scss'],
  standalone: false
})
export class PokemonAboutPage implements OnInit {
  pokemon: any;
  movesList: MoveEntry[] = [];

  constructor(private route: ActivatedRoute, private httpService: HttpService) {}

  ngOnInit() {
    const name = this.route.snapshot.paramMap.get('name');
    if (name) {
      this.httpService.getPokemonDetails(name).subscribe({
        next: (response: any) => {
          this.pokemon = response;
          this.processMoves(response.moves);
        },
        error: (err) => {
          console.error('Error al obtener los detalles del Pokémon:', err);
        }
      });
    }
  }

  processMoves(moves: any[]) {
    const movesMap: { [key: string]: MoveEntry } = {};

    moves.forEach((move: { move: { name: string }; version_group_details: MoveDetail[] }) => {
      const moveName = move.move.name;

      if (!movesMap[moveName]) {
        movesMap[moveName] = {
          name: moveName,
          levelUp: false,
          tutor: false,
          mtmo: false
        };
      }

      move.version_group_details.forEach((detail: MoveDetail) => {
        const method = detail.move_learn_method.name;
        if (method === 'level-up') {
          movesMap[moveName].levelUp = true;
        } else if (method === 'tutor') {
          movesMap[moveName].tutor = true;
        } else if (method === 'machine') {
          movesMap[moveName].mtmo = true;
        }
      });
    });

    this.movesList = Object.values(movesMap);
  }
}
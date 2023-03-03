import { Component, OnInit, Input } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model'

@Component({
  selector: 'pokemon-list',
  templateUrl: './pokemon-items.component.html',
  styleUrls: ['./pokemon-items.component.css']
})
export class PokemonListComponent implements OnInit {
  gridColumns = 5; // Default value for columns in catalogue
  @Input() pokemons: Pokemon[] = [];

  constructor() { }

  ngOnInit(): void {
  }
}

import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Pokemon } from '../models/pokemon.model';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {
  pokemons: any[] = [];
  page = 1;
  totalPokemons!: number;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.getPokemons();
   }
        getPokemons (){
          this.dataService.getPokemons(24,this.page + 0)
          .subscribe((response: any)=> {
            this.totalPokemons = response.count;
            response.results.forEach( (result: { name: string; }) => {
              this.dataService.getMoreData(result.name)
              .subscribe((uniqResponse: any)=> {
                this.pokemons.push(uniqResponse);
                console.log(this.pokemons);
        });
      });
    });
  }
  public pokemonById(id: string):  Pokemon | undefined {
    return this.pokemons.find((pokemon: Pokemon) => pokemon.name === id);
  }
}

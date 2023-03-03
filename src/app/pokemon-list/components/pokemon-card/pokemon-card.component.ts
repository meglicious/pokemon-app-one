import {Component, Input} from "@angular/core";
import {Pokemon} from './src/app/models/pokemon.model';
import {PokemonRawData} from './pokemon-card.component';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {finalize} from "rxjs";
import { UserService } from 'src/app/services/service/user.service';
import {PokemonCatalogueService} from "../../../../services/pokemon-catalogue.service";

@Component({
  selector:"pokemon-list-item",
  templateUrl:'./pokemon-card.component.html',
  styleUrls:['./pokemon-card.component.css']
})
export class PokemonCardComponent{

  public _pokemonData: PokemonRawData | undefined;
  public detailsLoaded: boolean = false;
  private _error: string = "";

  // Show the name with capital letter
  public getFormattedName(name : string){
    return name.toString().charAt(0).toUpperCase() + name.toString().slice(1).toLowerCase();
  }

  // Fetch the first value from the game_indices array to determine which was the first generation where this Pokemon appeared
  public getFirstAppearance(rawData : PokemonRawData){
    let version = rawData.game_indices.length > 0 ? rawData.game_indices[0].version.name : "no info";
    return version.toString().charAt(0).toUpperCase() + version.toString().slice(1);
  }

  // Fetch the elemental types
  public getTypes(rawData : PokemonRawData){
    let types = [];
    types = rawData.types.length > 0 ? rawData.types : [];
    let typesString = "";
    types.forEach((type, index)=> typesString += type.type.name + (index < types.length - 1 ? ", " : ""))
    return typesString;
  }

  // Get the passive effects called abilities
  public getAbilities(rawData : PokemonRawData){
    let abilities = [];
    abilities = rawData.abilities.length > 0 ? rawData.abilities : [];
    let abilitiesString = "";
    abilities.forEach((ability, index)=> abilitiesString += ability.ability.name + (index < abilities.length - 1 ? ", " : ""))
    return abilitiesString;
  }

  // The images are stored based on the running number of each pokemon so we can use the pokemon's number to determine the image url
  public GetUrl(pokemonUrl : string){
    const urlArray = pokemonUrl.split("/");
    const id = urlArray[urlArray.length-2];
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  }

  constructor (
    private readonly http: HttpClient
  ){}

  // Hides the pokemon details
  public hideDetails(): void{
    this._pokemonData = undefined;
  }

  // Fetch pokemon details from the url
  // @ts-ignore
  public getDetails(pokemonUrl: string): PokemonRawData {
    this.detailsLoaded = false;
    this.http.get<PokemonRawData>(pokemonUrl)
      .pipe(
        finalize(() => {
          this.detailsLoaded = true;
        })
      )
      .subscribe({
        next: (pokemonData: PokemonRawData) => {
          // this._pokemonRawData = pokemonData;
          console.log(`Found pokemon raw data for ${pokemonData.name}, weight ${pokemonData.weight}`);
          this._pokemonData = pokemonData;
          return pokemonData;
        },
        error: (error: HttpErrorResponse) => {
          this._error = error.message;
        }
      })
  }

  @Input() thisPokemon?: Pokemon;
}


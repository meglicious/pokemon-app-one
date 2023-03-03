import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {finalize} from 'rxjs';
import {environment} from 'src/app/enums/storage-keys.enum';
import {PokeData, Pokemon} from 'src/app/models/pokemon.model'
import {StorageUtil} from "src/app/utils/storage.util";
import {StorageKeys} from "src/app/enums/storage-keys.enum";

const { apiPokemons} = environment

@Injectable({
  providedIn: 'root'
})

// Handles the pokemon information in catalogue
export class PokemonCatalogueService {

  private _pokemons: Pokemon[] = [];
  private _error: string = "";
  private _loading: boolean = false;

  private currentUrl = apiPokemons;
  private previousUrl : string = "";
  private nextUrl : string = "";

  get pokemons(): Pokemon[] {
    return this._pokemons;
  }

  get error(): string {
    return this._error;
  }

  get loading(): boolean {
    return this._loading;
  }
  constructor(private readonly http: HttpClient) { }

   public nextPage(): void {
    if(this.nextUrl != ""){
      this.currentUrl = this.nextUrl;
      this.nextUrl = "";
      this.findAllPokemons();
    }
   }

  public prevPage(): void {
    if(this.previousUrl != ""){
      this.currentUrl = this.previousUrl;
      this.previousUrl = "";
      this.findAllPokemons();
    }
  }

  public firstPage(): boolean{
    return this.previousUrl == "";
  }

  public lastPage(): boolean{
    return this.nextUrl == "";
  }

  public findAllPokemons(): void {
    this._loading = true;
    this.http.get<PokeData>(this.currentUrl)
      .pipe(
        finalize(() => {
          this._loading = false;
        })
      )
      .subscribe({
        next: (pokemonData: PokeData) => {
          this._pokemons = pokemonData.results;
          StorageUtil.storageSave<Pokemon[]>(StorageKeys.Pokemon, this._pokemons);
          this.nextUrl = pokemonData.next;
          this.previousUrl = pokemonData.previous;
        },
        error: (error: HttpErrorResponse) => {
          this._error = error.message;
        }
      })
  }


}

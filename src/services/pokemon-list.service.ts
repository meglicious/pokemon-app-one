import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {finalize} from 'rxjs';
import {environment} from '.secure_files/environment';
import {PokeData, Pokemon} from '../models/pokemon.model';
import {StorageUtil} from "../utils/storage.util";
import {StorageKeys} from "../enums/storage-keys.enum";

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

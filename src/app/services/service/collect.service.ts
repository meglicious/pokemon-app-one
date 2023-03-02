import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '.secure_files/environment';
import { Pokemon } from '../models/pokemon.model';
import { User } from '../models/user.model';
import { PokemonCatalogueService } from './pokemon-catalogue.service';
import { UserService } from './user.service';

const { apiKey, apiUser } = environment;

@Injectable({
  providedIn: 'root',
})
export class CollectService {
  constructor(
    private http: HttpClient,
    private readonly pokemonService: PokemonCatalogueService,
    private readonly userService: UserService
  ) {}

  public addToCollected(pokemonId: string): Observable<User> {
    if (!this.userService.user) {
      throw new Error('AddToCollected: There is no user');
    }

    console.log(`Adding pokemonId ${pokemonId} to collected`);
    const user: User = this.userService.user;
    const pokemon: Pokemon | undefined =
      this.pokemonService.pokemonById(pokemonId);

    if (!pokemon) {
      throw new Error('AddToCollected: No pokemon with id: ' + pokemonId);
    }

    if (this.userService.inCollected(pokemonId)) {
      this.userService.removeFromCollected(pokemonId);
    } else {
      this.userService.addToCollected(pokemon);
    }

    const headers = new HttpHeaders({
      'content-type': 'application/json',
      'x-api-key': apiKey,
    });

    console.log("Sending add http");
    return this.http
      .patch<User>(
        `${apiUser}/${user.id}`,
        {
          pokemon: [...user.pokemon],
        },
        {
          headers,
        }
      )
      .pipe(
        tap((updatedUser: User) => {
          this.userService.user = updatedUser;
        })
      );
  }

  public removeFromCollected(pokemonName: string): Observable<User> {
    if (!this.userService.user) {
      throw new Error('removeFromCollected: There is no user');
    }
    const user: User = this.userService.user;

    const headers = new HttpHeaders({
      'content-type': 'application/json',
      'x-api-key': apiKey,
    });

    if (this.userService.inCollected(pokemonName)) {
      this.userService.removeFromCollected(pokemonName);
    }
    else
    {
      console.error(`Did not find ${pokemonName} from inCollected`);
    }

    console.log("Sending removal http!");

    return this.http
      .patch<User>(
        `${apiUser}/${user.id}`,
        {
          pokemon: [...user.pokemon],
        },
        {
          headers,
        }
      )
      .pipe(
        tap((updatedUser: User) => {
          this.userService.user = updatedUser;
          console.log("Pokemon removal succeeded");
        })
      );
  }
}


import { Injectable } from '@angular/core';
import { StorageKeys } from '../enums/storage-keys.enum';
import { Pokemon } from '../models/pokemon.model';
import { User } from '../models/user.model';
import { StorageUtil } from '../utils/storage.util';

@Injectable({
  providedIn: 'root'
})

// Handles collecting and removing pokemon from the user
export class UserService {

  private _user?: User;

  get user(): User | undefined {
    return this._user;
  }

  set user(user: User | undefined) {
    StorageUtil.storageSave<User>(StorageKeys.User, user!);
    this._user = user
  }

  public inCollected(pokemonName: string): boolean {
    if (this.user) {
      return Boolean(
        this.user?.pokemon.find(
          (pokemon: Pokemon) => pokemon.name === pokemonName
        )
      );
    }
    return false;
  }

  public addToCollected(pokemon: Pokemon): void {
    if(this._user) {
      this._user.pokemon.push(pokemon);
    }
  }

  public removeFromCollected(pokemonId: string): void {
    console.log(`User local pokemon count before removal of ${pokemonId}: ${this._user?.pokemon.length}`)
    if (this._user) {
      this._user.pokemon = this._user.pokemon.filter(
        (pokemon: Pokemon) => pokemon.name !== pokemonId
      );
    }
    console.log(`User local pokemon count after removal of ${pokemonId}: ${this._user?.pokemon.length}`)
  }

  constructor() {
    this._user = StorageUtil.storageRead<User>(StorageKeys.User);
   }
}

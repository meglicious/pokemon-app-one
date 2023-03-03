import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/service/user.service';
import { environment } from '.secure_files/environment';
import {CollectService} from "../services/service/collect.service";
import { PokemonListComponent } from 'src/app/pokemon-list/pokemon-list.component';

export class Trainer {
  constructor(public username: string, public pokemon: string) {}
}
const { apiUser } = environment;

@Component({
  selector: 'app-trainer-page',
  templateUrl: './trainer-page.component.html',
  styleUrls: ['./trainer-page.component.css']
})
export class TrainerPageComponent implements OnInit{

  trainer: Trainer[] | undefined;
  constructor(
    private httpClient: HttpClient,
    private userService: UserService,
    private collectService: CollectService
  ) {}

  get user(): User | undefined {
    return this.userService.user;
  }

  public GetImageUrl(pokemonUrl : string){
    let urlArray = pokemonUrl.split("/");
    const id = urlArray[urlArray.length-2];
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  }

  // Show the name with capital starting letter
  public getFormattedName(name : string){
    return name.toString().charAt(0).toUpperCase() + name.toString().slice(1).toLowerCase();
  }

  removeFromCollected(pokemonName: string) {
    this.collectService.removeFromCollected(pokemonName).subscribe({
      next: (user: User) => {
        console.log(pokemonName + " removed");
      },
      error: (error: HttpErrorResponse) => {
        console.log('ERROR', error.message);
      },
    });
  }

  getTrainers() {
    this.httpClient.get<any>(apiUser).subscribe((response) => {
      this.trainer = response;
    });
  }
  ngOnInit(): void {
    this.getTrainers();
  }
}

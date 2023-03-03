import { Component } from '@angular/core';

@Component({
  selector: 'app-environments',
  templateUrl: './environments.component.html',
  styleUrls: ['./environments.component.css']
})
export class EnvironmentsComponent {

}
export const environment = {
  production: false,
  apiUrl: 'https://pokeapi.co',
  imgUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/',
  pokeUrl: 'https://pokeapi.co/api/v2/pokemon/'
};

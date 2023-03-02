import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  constructor(
    private readonly router: Router,
    private readonly userService: UserService
  ) { }

    ngOnInit(): void {
        if (this.userService.user) {
          this.router.navigateByUrl("/pokemons")
        }
    }

  handleLogin(): void {
    this.router.navigateByUrl("/pokemons")
  }
}



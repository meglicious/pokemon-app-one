import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { CollectService } from 'src/app/services/service/collect.service';
import { UserService } from 'src/app/services/service/user.service';


@Component({
  selector: 'app-catch-me-button',
  templateUrl: './catch-me-button.component.html',
  styleUrls: ['./catch-me-button.component.css']
})
export class CatchMeButtonComponent implements OnInit {

  @Input() pokemonId: string = "";
  public isCollected: boolean = false;
  public loading: boolean = false;

  constructor(
    private userService: UserService,
    private readonly collectService: CollectService,
  ) { }

  ngOnInit(): void {
    this.isCollected = this.userService.inCollected(this.pokemonId);
  }

  onCollectClick(): void {
    this.loading = true;
    this.collectService.addToCollected(this.pokemonId).subscribe({
      next: (user: User) => {
        this.isCollected = this.userService.inCollected(this.pokemonId);
        this.loading = false;
      },
      error: (error: HttpErrorResponse) => {
        console.log('ERROR', error.message);
      },
    });
  }
}

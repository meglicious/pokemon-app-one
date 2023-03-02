import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/service/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  get user(): User | undefined {
    return this.userService.user;
  }

  constructor(
    private readonly router: Router,
    private readonly userService: UserService
  ) { }


  public onLogout() {
    this.userService.user = undefined;
     window.sessionStorage.clear();
     window.location.reload();
     this.router.navigateByUrl('/login');
   }

  ngOnInit(): void {
  }

}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  get user(): User | undefined {
    return this.userService.user;
}

constructor(private readonly userService: UserService, private readonly router: Router) { }

logout() {
    this.userService.logout();
    this.router.navigate(['/']); // redirect to login page
}
}

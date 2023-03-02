import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { LoginService } from 'src/app/services/service/login.service';
import { UserService } from 'src/app/services/service/user.service';

@Component({
  selector: 'app-loginForm',
  templateUrl: './loginForm.component.html',
  styleUrls: ['./loginForm.component.css']
})
export class LoginFormComponent {

  @Output() login: EventEmitter<void> = new EventEmitter();
  public loading: boolean = false;

  constructor(
    private readonly loginService: LoginService,
    private readonly userService: UserService,
    ) { }

  public loginSubmit(loginForm: NgForm): void {
    this.loading = true;
    const { username } = loginForm.value;

    this.loginService.login(username)
      .subscribe({
        next: (user: User) => {
          this.userService.user = user;
          this.login.emit()
        },
        error: () => {

        }
      })
  }

}

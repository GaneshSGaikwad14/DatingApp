import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../core/services/account-service';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { ToastService } from '../../core/services/toast-service';

@Component({
  selector: 'app-nav',
  imports: [FormsModule, RouterLink,RouterModule],
  templateUrl: './nav.html',
  styleUrls: ['./nav.css']
})
export class Nav {

  protected accountService=inject(AccountService);
  protected toastService=inject(ToastService);  
  private router=inject(Router);
  protected creds :any = {};

  login() {
    this.accountService.login(this.creds).subscribe({
      next: response => {
        this.router.navigateByUrl('/members');
        console.log(response);
        this.toastService.success('Logged in successfully');
      this.creds={};
      }
      ,
      error: error => {
        console.log(error);
        this.toastService.error(error.error);

      }
    });
}

logout() {
  this.accountService.logout();
  this.router.navigateByUrl('/');

}
}

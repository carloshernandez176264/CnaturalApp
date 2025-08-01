import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RegistrationComponent } from '../registration/registration.component';
import { Router } from '@angular/router';
import { Userdto } from 'src/app/models/userdto';
import Swal from 'sweetalert2';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { UserType } from 'src/app/models/user-type';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';  

  constructor(
    private dialog: MatDialog,
    private authentication: AuthenticationService,
    private sessionStorage: SessionStorageService,
    private router: Router
  ) {}

  login(){
    let userdto = new Userdto(this.username, this.password);
    this.authentication.login(userdto).subscribe(
      token => {
        this.sessionStorage.setItem('token', token);
        if(token.type == 'ADMIN'){
          this.router.navigate(['/admin/product']);
        }else{
          this.router.navigate(['/']);
        }
      }
    )
  }

  openRegister(): void {
    this.dialog.open(RegistrationComponent, {
      width: '500px',
      disableClose: false, // permite cerrarlo al hacer click fuera
      autoFocus: false,
    });
  }
}

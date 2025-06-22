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

  login(): void {
    if (!this.username || !this.password) {
      Swal.fire('Error', 'Completa todos los campos', 'warning');
      return;
    }

    const userdto = new Userdto(this.username, this.password);

    this.authentication.login(userdto).subscribe({
      next: (token) => {
        this.sessionStorage.setItem('token', token); // Guarda token en sesión
        const role = this.sessionStorage.getRole();

        Swal.fire('Bienvenido', 'Inicio de sesión exitoso', 'success'); // Mensaje de bienvenida

        if (role === 'ROLE_ADMIN') {
          this.router.navigate(['/product-add']);
        } else {
          this.router.navigate(['/home']);
        }
      },
      error: () => {
        Swal.fire('Error', 'Credenciales incorrectas', 'error');
      },
    });
  }

  openRegister(): void {
    this.dialog.open(RegistrationComponent, {
      width: '500px',
      disableClose: false, // permite cerrarlo al hacer click fuera
      autoFocus: false,
    });
  }
}

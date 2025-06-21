import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserType } from 'src/app/models/user-type';
import { AuthenticationService } from 'src/app/services/authentication.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private dialogRef: MatDialogRef<RegistrationComponent>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required]],
      cellphone: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  register(): void {
    if (this.registerForm.invalid) {
      Swal.fire('Campos inválidos', 'Revisa los campos del formulario', 'warning');
      return;
    }

    const form = this.registerForm.value;
    const user = new User(
      0,
      form.email,
      form.name,
      form.surname,
      form.email,
      form.address,
      form.cellphone,
      form.password,
      UserType.CUSTOMER
    );

    this.authService.register(user).subscribe({
      next: () => {
        Swal.fire('Éxito', 'Usuario registrado correctamente', 'success').then(() => {
          this.dialogRef.close();
        });
      },
      error: () => {
        Swal.fire('Error', 'No se pudo registrar el usuario', 'error');
      }
    });
  }

  get f() { return this.registerForm.controls; }

}

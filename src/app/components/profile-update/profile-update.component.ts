import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.css']
})
export class ProfileUpdateComponent {

  profileForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private session: SessionStorageService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const token = this.session.getItem('token');

    this.profileForm = this.fb.group({
      name: [token.name, Validators.required],
      surname: [token.surname, Validators.required],
      email: [{ value: token.email, disabled: true }],
      address: [token.address],
      cellphone: [token.cellphone]
    });
  }

  updateProfile(): void {
    if (this.profileForm.invalid) return;

    const data = this.profileForm.getRawValue();
    this.userService.updateProfile(data).subscribe({
      next: () => {
        Swal.fire('Éxito', 'Perfil actualizado', 'success');
      },
      error: () => {
        Swal.fire('Error', 'No se pudo actualizar el perfil', 'error');
      }
    });
  }

}

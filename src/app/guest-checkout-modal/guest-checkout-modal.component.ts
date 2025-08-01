import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-guest-checkout-modal',
  templateUrl: './guest-checkout-modal.component.html',
  styleUrls: ['./guest-checkout-modal.component.css']
})
export class GuestCheckoutModalComponent {

  guestData = {
    name: '',
    email: '',
    address: '',
    phone: ''
  };

  constructor(
    public dialogRef: MatDialogRef<GuestCheckoutModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  confirm(): void {
    this.dialogRef.close(this.guestData);
  }

  cancel(): void {
    this.dialogRef.close(null);
  }

}

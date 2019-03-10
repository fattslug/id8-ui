import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss']
})
export class LoginModalComponent implements OnInit {
  public loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<LoginModalComponent>
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  public doLogin() {
    this.dialogRef.close(this.loginForm.value);
  }

}

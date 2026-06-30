import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Auth } from '../../services/auth';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.css',
})
export class ForgotPassword {
  private formBuilder = inject(FormBuilder);
  private authService = inject(Auth);
  mensaje: string = '';
  enviando: boolean = false;

  forgotForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]]
  });

  forgotPassword() {
    const email = this.forgotForm.value.email;
    if (email) {
      this.enviando = true;
      this.authService.forgotPassword(email).subscribe({
        next: () => {
          this.mensaje = 'Correo enviado. Revisa tu bandeja de entrada.';
        },
        error: () => {
          this.mensaje = 'Correo enviado. Revisa tu bandeja de entrada.';
        }
      });
    }
  }
}

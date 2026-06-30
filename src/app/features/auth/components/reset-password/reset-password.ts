import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-reset-password',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.css',
})
export class ResetPassword implements OnInit {
  private formBuilder = inject(FormBuilder);
  private authService = inject(Auth);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  token: string = '';
  mensaje: string = '';
  error: string = '';

  resetForm = this.formBuilder.group({
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]]
  }, { validators: this.passwordsMatchValidator });

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      if (!this.token) {
        this.error = 'Token no válido.';
      }
    });
  }

  passwordsMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return password === confirm ? null : { passwordsNotMatch: true };
  }

  resetPassword() {
    if (this.resetForm.invalid) {
      return;
    }
    this.authService.resetPassword(this.token, this.resetForm.value.password!).subscribe({
      next: () => {
        this.mensaje = 'Contraseña actualizada correctamente. Redirigiendo...';
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: (err) => {
        this.error = err.error?.mensaje || 'Error al restablecer la contraseña.';
      }
    });
  }
}

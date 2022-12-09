import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  @Input() name: string;
  form: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      password: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      fullName: [''],
      userName: ['', [Validators.required]],
      phone: ['', [Validators.required]]
    });
  }

  register() {
    if (this.form.invalid) {
      console.log("error de datos");
      return;
    }
    this.authService.register(this.form.value).subscribe(async (data: any) => {
      await Preferences.set({ key: 'token', value: data.token });
      this.router.navigate(['/']);
    }, error => {
      console.log(error);
    });
  }

}

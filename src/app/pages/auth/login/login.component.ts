import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
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
      email: ['', [Validators.required, Validators.email]]
    });
  }

  login() {
    if (this.form.invalid) {
      console.log("error de datos");
      return;
    }
    this.authService.login(this.form.value).subscribe(async (data: any) => {
      await Preferences.set({ key: 'token', value: data.token });
      this.router.navigate(['/']);
    }, error => {
      console.log(error);
    });
  }

}

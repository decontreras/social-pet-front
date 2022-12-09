import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { JwtDecodeService } from 'src/app/services/jwt-decode.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-personalInformation',
  templateUrl: 'personalInformation.page.html',
  styleUrls: ['personalInformation.page.scss']
})
export class PersonalInformationPage implements OnInit {

  publishList: any;
  form: FormGroup = new FormGroup({});
  userToken: any;

  constructor(
    private userService: UserService,
    private jwtDecodeService: JwtDecodeService,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(async (params) => {
      this.form = this.fb.group({
        fullName: ["", [Validators.required, Validators.minLength(4)]],
        phone: ["", [Validators.required, Validators.min(1111111111), Validators.max(9999999999)]],
        email: ["", [Validators.required, Validators.email]],
        dateOfBirth: ["", [Validators.required]],
        address: ["", [Validators.required, Validators.minLength(4)]],
        profession: ["", [Validators.required, Validators.minLength(4)]],
        business: ["", [Validators.required, Validators.minLength(4)]],
        landline: ["", [Validators.required, Validators.min(1111111), Validators.max(9999999)]],
        maritalStatus: ["", [Validators.required]],
        typeAccount: ["", [Validators.required]]
      });
      const { value } = await Preferences.get({ key: 'token' });
      this.userToken = this.jwtDecodeService.decodeToken(value);
      this.getUser(this.userToken.uid);
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth() + 1;
      var yyyy = today.getFullYear() - 18;
      var ddString = dd.toString();
      var mmString = mm.toString();
      if (dd < 10) {
        ddString = '0' + dd
      }
      if (mm < 10) {
        mmString = '0' + mm
      }

      var todayString = yyyy + '-' + mm + '-' + ddString;
      document.getElementById("datefield").setAttribute("max", todayString);
    });
  }

  getUser(userSelect) {
    this.userService.getUserById(userSelect).subscribe((data: any) => {
      this.form = this.fb.group({
        fullName: [data.fullName, [Validators.required, Validators.minLength(4)]],
        phone: [data.phone, [Validators.required, Validators.min(1111111111), Validators.max(9999999999)]],
        email: [data.email, [Validators.required, Validators.email]],
        dateOfBirth: [data.dateOfBirth, [Validators.required]],
        address: [data.address, [Validators.required, Validators.minLength(4)]],
        profession: [data.profession, [Validators.required, Validators.minLength(4)]],
        business: [data.business, [Validators.required, Validators.minLength(4)]],
        landline: [data.landline, [Validators.required, Validators.min(1111111), Validators.max(9999999)]],
        maritalStatus: [data.maritalStatus, [Validators.required]],
        typeAccount: [data.typeAccount, [Validators.required]]
      });
    }, error => {
      console.log(error);
    });
  }

  edit() {
    if (this.form.valid) {
      this.userService.update(this.userToken.uid, this.form.value).subscribe(async (data: any) => {
        await Preferences.set({ key: 'token', value: data.token });
        return this.router.navigate(['/']);
      }, error => {
        console.log(error);
      });
    }
  }

}

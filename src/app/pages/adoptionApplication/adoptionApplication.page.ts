import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { PublishService } from 'src/app/services/publish.service';
import { JwtDecodeService } from 'src/app/services/jwt-decode.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-adoptionApplication',
  templateUrl: 'adoptionApplication.page.html',
  styleUrls: ['adoptionApplication.page.scss']
})
export class AdoptionApplicationPage implements OnInit {

  adoptionApplicationList: any;
  userToken: any = {};
  isModalOpen = false;
  form: FormGroup = new FormGroup({});

  constructor(
    private publishService: PublishService,
    private jwtDecodeService: JwtDecodeService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(async (params) => {
      const { value } = await Preferences.get({ key: 'token' });
      this.userToken = this.jwtDecodeService.decodeToken(value);
      this.listAdoptionApplication();
    });
  }

  listAdoptionApplication() {
    this.publishService.getRequestByUser(this.userToken.uid).subscribe((data: any) => {
      this.adoptionApplicationList = data;
    }, error => {
      console.log(error);
    });
  }

  setOpen(isOpen: boolean, data: any) {
    console.log("aquiiii",data);
    
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
    this.isModalOpen = isOpen;
  }

}

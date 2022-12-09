import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PublishService } from 'src/app/services/publish.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {

  publishList: any = [];
  userS: any;
  dataSearch: any;

  constructor(
    private publishService: PublishService,
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(async (params) => {
      this.listPublish();
    });
  }

  listPublish() {
    this.publishService.list().subscribe((data) => {
      this.publishList = data;
    }, error => {
      console.log(error);
    });
  }

  searchUser() {
    this.userService.getUserBySearch(this.userS).subscribe((data) => {
      this.dataSearch = data;
    }, error => {
      this.dataSearch = [];
    });

  }

  goToProfile(id) {
    this.router.navigate(['/tabs/tab5', { id }]);
    this.dataSearch = [];
    this.userS = "";
  }

}

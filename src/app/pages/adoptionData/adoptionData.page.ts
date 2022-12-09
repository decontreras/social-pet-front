import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PublishService } from 'src/app/services/publish.service';

@Component({
  selector: 'app-adoptionData',
  templateUrl: 'adoptionData.page.html',
  styleUrls: ['adoptionData.page.scss']
})
export class AdoptionDataPage implements OnInit {

  publishList: any;

  constructor(
    private publishService: PublishService,
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

}

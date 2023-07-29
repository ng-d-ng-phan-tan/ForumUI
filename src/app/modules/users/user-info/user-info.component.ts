import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
  ){
    route.params.subscribe(params => {
      console.log(params['id']);
      
    })
  }
  
  ngOnInit(){
    
  }
}

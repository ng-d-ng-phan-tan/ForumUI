import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-activateaccount',
  templateUrl: './activateaccount.component.html',
  styleUrls: ['./activateaccount.component.css']
})
export class ActivateaccountComponent implements OnInit {
  email : any;
  activate: any;
  activateSuccess: any;
  displayProcess = true

  constructor(private auth: AuthService,
    private route: ActivatedRoute) {}
    
  ngOnInit(): void {
    this.email = this.route.snapshot.queryParamMap.get('email');
    this.activate = this.route.snapshot.queryParamMap.get('activate');
    this.auth.activateAccount(this.email, this.activate).subscribe((res) => {
      if(res.status == 200){
        this.activateSuccess = true;
      }
      else{
        this.activateSuccess = false;
      }
      this.displayProcess = false
    })
  }

  

}

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  headerLogoFilename="../../favicon.ico"
  isLoggedIn!:boolean;
  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    this.authService.authenticated$.subscribe((data: boolean)=>{
      this.isLoggedIn=data;
      console.log(this.isLoggedIn)
    })
  }
  logout(){
    this.authService.logout();
  }

}

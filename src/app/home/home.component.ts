import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: any = [];
  
  constructor(private dataService: DataService , private router : Router) {

  }

  ngOnInit() {
    this.dataService.sendGetRequest().subscribe((data: any[]) => {
      this.products = data;
    })
  }

  details(id:any){
    this.router.navigate( ['details/' + id] )
  }


}

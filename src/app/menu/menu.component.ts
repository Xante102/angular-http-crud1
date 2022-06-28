import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { menu } from 'menu';
import { MenuService } from '../menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  providers:[MenuService]
})
export class MenuComponent implements OnInit {

  menu !: menu[];

  constructor(
    private _menuService : MenuService,
    private router : Router
    ) { }

  ngOnInit(): void{
   this.getMenu()
  }

  getMenu(){
    this._menuService.getMenu().subscribe({
      next:(resp : menu[]) => {
       this.menu = resp
      },
      error:(err:Error) => {
        console.log('Error occured retrieving menu');
      }
    });
  }


  viewMore(item:number){
  this.router.navigate(['menu/view-more/'+ item])
  }



}

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

  goToeditDish(dish:menu){
    console.log(JSON.stringify(dish));

    localStorage.setItem('dish', JSON.stringify(<menu[]>[{
      id : dish.id,
      menu_name: dish.menu_name,
      menu_description: dish.menu_description,
      menu_size:dish.menu_size,
      imageUrl:"https://source.unsplash.com/1600x900/?food",
      cost: dish.cost
    }]));

    this.router.navigate(['menu/edit-menu'])


  }





  deleteDish(item:number){
    this._menuService.deleteMenuItem(item).subscribe({
      next:(resp: menu) => {
       alert('Product Deleted');
      },
      error: () => {
        alert('Error occured deleting item');
      },
      complete: () => {
        this.getMenu();
      },
    })
  }



}

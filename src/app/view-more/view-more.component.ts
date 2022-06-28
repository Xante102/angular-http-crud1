import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { menu } from 'menu';
import { MenuService } from '../menu.service';

@Component({
  selector: 'app-view-more',
  templateUrl: './view-more.component.html',
  styleUrls: ['./view-more.component.css']
})
export class ViewMoreComponent implements OnInit {

  menuItem !: menu;

  constructor(
    private _menuService : MenuService,
    private router : Router,
    private activatedRoute: ActivatedRoute
    ) { }


  ngOnInit(): void{
   this.getMenuItem()
  }

  getMenuItem(){

    const routeParams = this.activatedRoute.snapshot.paramMap;
    const id = Number(routeParams.get('id'));

    this._menuService.getMenuItem(id).subscribe({
      next:(resp : menu) => {
        this.menuItem = resp;
       },
       error:(err:Error) => {
         console.log('Error occured retrieving menu item');
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
        this.router.navigate(['menu/menu-list'])
      },
    })
  }

}

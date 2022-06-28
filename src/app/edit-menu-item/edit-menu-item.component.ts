import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService } from '../menu.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { menu } from 'menu';

@Component({
  selector: 'app-edit-menu-item',
  templateUrl: './edit-menu-item.component.html',
  styleUrls: ['./edit-menu-item.component.css'],
})
export class EditMenuItemComponent implements OnInit {

  menuEditForm !: FormGroup;


  constructor(
    private _menuService : MenuService,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.intializeForm();
  }


  intializeForm(){
    var dish : any = Array.from(JSON.parse(localStorage.getItem('dish') as string))


    this.menuEditForm = new FormGroup({
      id: new FormControl(dish[0].id, []),
      menu_name: new FormControl(dish[0].menu_name,[Validators.required]),
      menu_description: new FormControl(dish[0].menu_description,Validators.required),
      menu_size : new FormControl(dish[0].menu_size,[Validators.required]),
      imageUrl: new FormControl(dish[0].imageUrl, []),
      cost : new FormControl(dish[0].cost,[Validators.required])
    })

  }


editMenuItem(){
  if(this.menuEditForm.valid){
    let id = this.menuEditForm.value.id;
    this._menuService.editMenuItem(this.menuEditForm.value).subscribe({
      next:(resp:menu) => {
        this.router.navigate(['menu/view-more/' + id])
      },
      error:() =>{
        alert('Error occured')
      },
      complete:() =>{
        console.log('Edited');
      }
    })
  }

}



}

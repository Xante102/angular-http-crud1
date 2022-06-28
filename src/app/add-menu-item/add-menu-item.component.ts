import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService } from '../menu.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { menu } from 'menu';

@Component({
  selector: 'app-add-menu-item',
  templateUrl: './add-menu-item.component.html',
  styleUrls: ['./add-menu-item.component.css'],
})
export class AddMenuItemComponent implements OnInit {

  menuForm !: FormGroup;
  menuLength !: number;

  constructor(
    private _menuService : MenuService,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.getLength();
    this.intializeForm();
  }


  intializeForm(){
    this.menuForm = new FormGroup({
      id: new FormControl('', []),
      menu_name: new FormControl('',[Validators.required]),
      menu_description: new FormControl('',Validators.required),
      menu_size : new FormControl('',[Validators.required]),
      imageUrl: new FormControl('https://source.unsplash.com/1600x900/?food', []),
      cost : new FormControl('',[Validators.required])
    })

  }


  addToMenu(){
    if(this.menuForm.valid){

      this._menuService.addMenuItem(this.menuForm.value).subscribe({
        next: (resp : menu) => {
          this.menuForm.reset();
        },
        error: (err: Error) => {
          alert('Error occurred ')
        },
        complete: () => {
          alert('Menu Item added');
          this.router.navigate(['/menu/menu-list'])
        }
      })
    }else{
      alert('Form is not valid please recheck');
    }

  }

  getLength(){
    this._menuService.getMenu().subscribe((resp:menu[]) => {
      this.menuLength = resp.length
    })
  }



}

import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { DetailsComponent } from './details/details.component';
import { ContactComponent } from './contact/contact.component';
import { SuccessComponent } from './success/success.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { MenuComponent } from './menu/menu.component';
import { AddMenuItemComponent } from './add-menu-item/add-menu-item.component';
import { EditMenuItemComponent } from './edit-menu-item/edit-menu-item.component';
import { ViewMoreComponent } from './view-more/view-more.component';


const routes: Routes = [
  {path: "" ,
redirectTo: "home",
pathMatch: "full"},
{path: "home", component: HomeComponent},
{path: "about", component: AboutComponent},
{path: "details/:id", component: DetailsComponent},
{path: "contact", component: ContactComponent},
{path: "success", component: SuccessComponent},
{path: "cart", component: ShoppingCartComponent},
{path: "menu",
 children:[
  {path:"menu-list",  component: MenuComponent,},
  {path:'add-menu', component:AddMenuItemComponent},
  {path:'edit-menu', component:EditMenuItemComponent},
  {path:'view-more/:id', component:ViewMoreComponent}
 ]
},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

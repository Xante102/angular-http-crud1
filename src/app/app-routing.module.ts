import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { DetailsComponent } from './details/details.component';
import { ContactComponent } from './contact/contact.component';
import { SuccessComponent } from './success/success.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';


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

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

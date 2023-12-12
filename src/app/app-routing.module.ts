import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { HomePageComponent } from './home/home-page/home-page.component';
import { ContactComponent } from './components/contact/contact.component';

const routes: Routes = [

{path:'', component:HomePageComponent},

  {path:'about' , component:AboutComponent},
  {path:'contact' , component:ContactComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

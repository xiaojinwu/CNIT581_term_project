import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component'; 
import { AboutComponent } from './pages/dash/about/about.component';
import { DashComponent } from './pages/dash/dash.component';

const routes: Routes = [  
  { path: '', 
    component: MainComponent,
    children: [
      {path:'', redirectTo: 'dashboard', pathMatch: 'full'},
      {path:'dashboard', component: DashComponent},
      {path:'about', component: AboutComponent},
    ]
}, 
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]

})
export class MainRoutingModule { }

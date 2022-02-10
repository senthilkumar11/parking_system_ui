import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateSystemComponent } from './create-system/create-system.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NewEntryComponent } from './new-entry/new-entry.component';
import { ParkingDetailsComponent } from './parking-details/parking-details.component';
import { AuthGuard } from './service/auth.guard';
import { SlotDetailsComponent } from './slot-details/slot-details.component';

const routes: Routes = [{
  path:'',
  redirectTo:'home',
  pathMatch:'full'
},
{
  path:'home',
  component:HomeComponent,
  canActivate: [AuthGuard]

},
{
  path:'park',
  component:NewEntryComponent,
  canActivate: [AuthGuard]

},
{
  path:'login',
  component:LoginComponent
},
{
  path:'parking_details',
  component:ParkingDetailsComponent,
  canActivate:[AuthGuard]
},
{
  path:'create_system',
  component:CreateSystemComponent,
  canActivate:[AuthGuard]
},
{
  path:'slotDetails/:id',
  component:SlotDetailsComponent,
  canActivate:[AuthGuard]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

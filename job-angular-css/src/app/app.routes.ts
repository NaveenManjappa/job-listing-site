import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { JobsComponent } from './jobs/jobs.component';
import { AddJobComponent } from './add-job/add-job.component';

export const routes: Routes = [
  {
    path:'home',
    component:HomeComponent
  },
  {
    path:'jobs',
    component:JobsComponent
  },
  {
    path:'add-job',
    component:AddJobComponent
  }
];

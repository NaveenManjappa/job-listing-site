import { Component } from '@angular/core';
import { HeroComponent } from "./hero/hero.component";
import { HomeCardComponent } from "./home-card/home-card.component";
import { JobListingsComponent } from "./job-listings/job-listings.component";
import { ViewAllJobsComponent } from './view-all-jobs/view-all-jobs.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeroComponent, HomeCardComponent, JobListingsComponent,ViewAllJobsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}

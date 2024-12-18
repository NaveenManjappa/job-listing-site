import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { JobsService } from '../../shared/jobs.service';
import { map } from 'rxjs/operators';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-job-listings',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './job-listings.component.html',
  styleUrl: './job-listings.component.css'
})
export class JobListingsComponent implements OnInit {
  jobsService = inject(JobsService);
  recentJobs:any;

  ngOnInit(): void {
    this.jobsService.getJobs().pipe(
      map(jobs => (jobs as any[]).slice(0,3))
    ).subscribe({
      next: top3Jobs => {
        this.recentJobs = top3Jobs;
      },
      error: err => {
        console.log(err)
      }
    })
  }
}

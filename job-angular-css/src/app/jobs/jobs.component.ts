import { Component, inject, OnInit } from '@angular/core';
import { JobsService } from '../shared/jobs.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-jobs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.css'
})
export class JobsComponent implements OnInit {

  jobService = inject(JobsService);
  jobs: any;

  ngOnInit(): void {
    this.jobService.getJobs().subscribe({
      next: res => {
        console.log('res',res);
        this.jobs = res;
      },
      error: err => console.log(err)
    });    
  }
}

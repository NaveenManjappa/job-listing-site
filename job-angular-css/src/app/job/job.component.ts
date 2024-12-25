import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { JobsService } from '../shared/jobs.service';

@Component({
  selector: 'app-job',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './job.component.html',
  styleUrl: './job.component.css'
})
export class JobComponent implements OnInit {
  route = inject(ActivatedRoute);
  jobService = inject(JobsService);
  router = inject(Router);
  selectedJob:any;

  ngOnInit(): void {
    let jobId:any;
    this.route.params.subscribe(params=> {
      console.log(params['id']);
      jobId = params['id'];
    });

    this.route.queryParams.subscribe(queryParams => {
      console.log(queryParams['type'])
    });

    this.jobService.getJob(jobId).subscribe({
      next: job => {
        console.log(job);
        this.selectedJob = job;
      }
    });
  }

  deleteJob(jobId:string){
    if(confirm("Are you sure you want to delete the job?")){
      this.jobService.deleteJob(jobId).subscribe({
        next: res => {
          console.log('res');
          this.router.navigate(['/jobs']);
        },
        error: err => {
          console.log(err);
        }
      });
    }
  }

}

import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { JobsService } from '../shared/jobs.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-job',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './add-job.component.html',
  styleUrl: './add-job.component.css'
})
export class AddJobComponent implements OnInit {

  jobTypes = ['Full-Time','Part-Time','Remote','Internship'];

  salaryRanges = [
    "Under $50K",
    "$50K - $60K",
    "$60K - $70K",
    "$70K - $80K",
    "$80K - $90K",
    "$90K - $100K",
    "$100K - $125K",
    "$125K - $150K",
    "$150K - $175K",
    "$175K - $200K",
    "Over $200K"
  ];

  jobForm!: FormGroup;
  submitted =false;
  jobService = inject(JobsService);
  selectedJob!:any;
  jobId!:string;
  isEditMode:boolean = false;

  constructor(private router:Router,private activatedRoute:ActivatedRoute) {
  }

  ngOnInit(): void {
    this.initializeForm();

    this.activatedRoute.params.subscribe(params => {
      this.jobId = params['id'];
      console.log('JobId', this.jobId);
      if(this.jobId){
        this.jobService.getJob(this.jobId).subscribe(job => {
          this.selectedJob = job;
          console.log('selectedJob',this.selectedJob);
          this.isEditMode = true;
          this.initializeForm();
        });
      }      
    });
  }

  private initializeForm() {
    
    this.jobForm = new FormGroup({
      type: new FormControl(this.selectedJob?.type || this.jobTypes[0]),
      jobName: new FormControl(this.selectedJob?.jobName || '', { validators: [Validators.required, Validators.minLength(3)] }),
      description: new FormControl(this.selectedJob?.description || ''),
      salary: new FormControl(this.selectedJob?.salary || this.salaryRanges[0]),
      location: new FormControl(this.selectedJob?.location || '', Validators.required),
      companyInfo: new FormGroup({
        company: new FormControl(this.selectedJob?.companyInfo?.company || ''),
        description: new FormControl(this.selectedJob?.companyInfo?.description || ''),
        email: new FormControl(this.selectedJob?.companyInfo?.email || '', { validators: [Validators.required, Validators.email] }),
        phone: new FormControl(this.selectedJob?.companyInfo?.phone || '')
      })
    });
  }

  get jobName() {
    return this.jobForm.get('jobName');
  }

  get location() {
    return this.jobForm.get('location');
  }

  get email() {
    return this.jobForm.get('companyInfo.email');
  }

  ManageJob() {
    this.submitted = true;
    console.log(this.jobForm.value);
    console.log('jobId',this.jobId);
    if(!this.jobForm.invalid){
      
      if(this.isEditMode)
        this.updateJob();      
      else 
        this.createJob();            
    }
  }

  private updateJob() {
    this.jobService.updateJob(this.jobId,this.jobForm.value).subscribe({
      next: res => {
        console.log('res');
        this.router.navigate(['/jobs']);
      },
      error: err => {
        console.log(err);
      }
    });
  }

  private createJob() {
    this.jobService.addJob(this.jobForm.value).subscribe({
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

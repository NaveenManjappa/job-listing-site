import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { JobsService } from '../shared/jobs.service';
import { Router } from '@angular/router';

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

  constructor(private router:Router) {
  }
  ngOnInit(): void {

    this.jobForm = new FormGroup({
      type: new FormControl(this.jobTypes[0]),
      jobName:new FormControl('',{validators: [Validators.required,Validators.minLength(3)]}),
      description:new FormControl(),
      salary:new FormControl(this.salaryRanges[0]),
      location:new FormControl('',Validators.required),
      companyInfo:new FormGroup({
        company:new FormControl(),
        description:new FormControl(),
        email:new FormControl('',{validators:[ Validators.required,Validators.email] }),
        phone:new FormControl()
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

  CreateJob() {
    this.submitted = true;
    console.log(this.jobForm.value);
    if(!this.jobForm.invalid){
      this.jobService.addJob(this.jobForm.value).subscribe({
        next: res => {
          console.log('res');
          this.router.navigate(['/jobs']);
        },
        error: err => {
          console.log(err);
        }
      })
    }

  }


}

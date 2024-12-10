import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-add-job',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-job.component.html',
  styleUrl: './add-job.component.css'
})
export class AddJobComponent {
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
}

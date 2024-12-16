import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JobsService {
  http = inject(HttpClient)
  constructor() { }

  addJob(jobs:any) {
    return this.http.post('http://localhost:5001/jobs',jobs);
  }
}

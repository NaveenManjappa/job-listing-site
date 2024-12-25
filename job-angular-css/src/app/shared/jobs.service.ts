import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JobsService {
  http = inject(HttpClient)
  constructor() { }
  
    private readonly apiUrl = 'http://localhost:5001/jobs';

    addJob(jobs:any) {
      return this.http.post(this.apiUrl, jobs);
    }

    getJobs() {
      return this.http.get(this.apiUrl);
    }

    getJob(id:string){
      return this.http.get(`${this.apiUrl}/${id}`);
    }

    updateJob(id:string,job:any){
      return this.http.put(`${this.apiUrl}/${id}`,job);
    }
}

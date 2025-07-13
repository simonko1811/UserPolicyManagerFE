import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Policy } from '../models/policy';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PolicyService {
  private apiUrl = 'http://localhost:8080/api/policies';

  constructor(private http: HttpClient) {}

  getPolicies(): Observable<Policy[]> {
    return this.http.get<Policy[]>(this.apiUrl);
  }

  getPolicy(id: string): Observable<Policy> {
    return this.http.get<Policy>(`${this.apiUrl}/${id}`);
  }

  addPolicy(policy: Policy): Observable<void> {
    return this.http.post<void>(this.apiUrl, policy);
  }

  updatePolicy(id: string, policy: Policy): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, policy);
  }

  deletePolicy(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

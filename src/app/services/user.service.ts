import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  getUser(name: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${name}`);
  }

  addUser(user: User): Observable<void> {
    return this.http.post<void>(this.apiUrl, user);
  }

  updateUser(name: string, user: User): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${name}`, user);
  }

  deleteUser(name: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${name}`);
  }
}

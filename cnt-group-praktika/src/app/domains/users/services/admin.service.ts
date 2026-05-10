import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs'; 
import { Admin } from '../models/admin.model'; 

export interface AdminsResponse {
  ok: boolean;
  admins: Admin[];
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = '/api/admins'; 

  constructor(private http: HttpClient) {} 

  getAdmins(): Observable<AdminsResponse> {
    return this.http.get<AdminsResponse>(this.apiUrl); 
  }

  createAdmin(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data); 
  }

  updateAdmin(id: number, data: any): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${id}`, data); 
  }

  deleteAdmin(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`); 
  }
}
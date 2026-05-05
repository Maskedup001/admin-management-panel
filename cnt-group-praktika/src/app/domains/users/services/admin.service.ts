import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs'; 

export interface Admin {
  id?: number;
  username: string;
  email: string;
  password?: string;
}

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

  // 1. GET — Получить список всех пользователей
  getUsers(): Observable<AdminsResponse> {
    return this.http.get<AdminsResponse>(this.apiUrl); 
  }

  // 2. POST — Создать нового пользователя
  createUser(data: Admin): Observable<any> {
    return this.http.post<any>(this.apiUrl, data); 
  }

  // 3. PATCH — Обновление администратора (соответствует @router.patch в Python)
  updateUser(id: number, data: Partial<Admin>): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${id}`, data); 
  }

  // 4. DELETE — Удалить пользователя по ID
  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`); 
  }
}
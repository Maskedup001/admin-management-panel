import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../../domains/users/services/admin.service'; 
import { Admin } from '../../../../domains/users/models/admin.model'; 

@Component({
    selector: 'app-admin-page',
    templateUrl: './admin-page.component.html',
    styleUrls: ['./admin-page.component.css'],
    standalone: false
})
export class AdminPageComponent implements OnInit {
  users: Admin[] = []; // Массив для вывода администраторов в HTML-таблицу

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  // Вызываем метод GET из сервиса и подписываемся на поток данных
  loadUsers(): void {
    this.adminService.getAdmins().subscribe({
      next: (data) => {
        this.users = data.admins; 
        console.log('Данные для админки успешно загружены!', data);
      },
      error: (err) => {
        console.error('Не удалось загрузить данные:', err);
      }
    });
  }

  // Метод для кнопки удаления по клику в таблице (используем admin_id из базы)
  deleteUser(adminId: number): void {
    if (confirm('Удалить пользователя?')) {
      this.adminService.deleteAdmin(adminId).subscribe({
        next: () => {
          console.log('Пользователь успешно удален на сервере');
          this.loadUsers(); 
        },
        error: (err) => console.error('Ошибка удаления:', err)
      });
    }
  }
}
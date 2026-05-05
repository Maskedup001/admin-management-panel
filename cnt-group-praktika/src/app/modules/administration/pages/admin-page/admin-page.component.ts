import { Component, OnInit } from '@angular/core';
import { AdminService, Admin } from '../../../../domains/users/services/admin.service'; 

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {
  users: Admin[] = []; // Массив для вывода администраторов в HTML-таблицу

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  // Вызываем метод GET из сервиса и подписываемся на поток данных
  loadUsers(): void {
    this.adminService.getUsers().subscribe({
      next: (data) => {
        this.users = data.admins; 
        console.log('Данные для админки успешно загружены!', data);
      },
      error: (err) => {
        console.error('Не удалось загрузить данные:', err);
      }
    });
  }

  // Метод для кнопки удаления по клику в таблице(если будет)
  deleteUser(id: number): void {
    if (confirm('Удалить пользователя?')) {
      this.adminService.deleteUser(id).subscribe({
        next: () => {
          console.log('Пользователь успешно удален на сервере');
          this.loadUsers(); // Перезагружаем список на экране
        },
        error: (err) => console.error('Ошибка удаления:', err)
      });
    }
  }
}
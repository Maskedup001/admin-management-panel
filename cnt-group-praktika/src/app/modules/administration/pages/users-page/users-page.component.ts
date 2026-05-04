import { Component } from '@angular/core';
import { UserRegister } from 'src/app/domains/users/models/user.model';
import { UserService } from 'src/app/domains/users/services/user.service';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.css']
})
export class UsersPageComponent {
  // 0 - скрыть | 1 - добавить пользователя | 2 - редактировать пользователя
  asideIndex: number = 1;

  users: UserRegister[] = this.userService.users;
  selectedUser: UserRegister | null = null; // выбранный юзер (при клике на таблице, для редактирования)

  constructor(private userService: UserService) {}

  onAddUserBtn() {
    this.asideIndex = 1;
  }

  // клик по юзеру в таблице
  onUserSelect(user: any) {
    this.asideIndex = 2;
    this.selectedUser = user;
  }

  // применение отредактированных данных
  updateUser(updatedUser: UserRegister) {
    const index = this.users.findIndex(user => user.userId === updatedUser.userId);
    if (index !== -1) {
      this.users[index] = updatedUser;
    }
  }
}
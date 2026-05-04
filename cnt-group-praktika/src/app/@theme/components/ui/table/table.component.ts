import { Component, EventEmitter, Input, OnChanges, Output, OnInit } from '@angular/core';
import { UserService } from 'src/app/domains/users/services/user.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnChanges, OnInit {
  @Input() columnHeaders: string[] = [];
  @Input() data: any[] = [];
  @Output() rowClick = new EventEmitter<any>();
  dataKeys: string[] = [];
  userRoles: { [key: string]: string[] } = {};

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUserRoles();
  }

  ngOnChanges() {
    if (this.data.length > 0) {
      this.dataKeys = Object.keys(this.data[0]);
    }
  }

  loadUserRoles() {
    this.userService.getAllRoles().subscribe(roles => {
      this.userRoles = roles;
      console.log('Loaded roles:', this.userRoles); // Для отладки
    });
  }

  onRowClick(user: any) {
    this.rowClick.emit(user);
  }

  // Подсветка всей строки
  getRowColor(userId: string): string {
    const roles = this.userRoles[userId];
    console.log('User ID:', userId, 'Roles:', roles); // Для отладки
    
    if (!roles || roles.length === 0) return '';
    
    if (roles.includes('admin') && roles.includes('student')) {
      return '#fff3e0'; // Оранжевый
    } else if (roles.includes('admin')) {
      return '#ffebee'; // Красный
    } else if (roles.includes('student')) {
      return '#e8f5e8'; // Зеленый
    }
    
    return '';
  }

  // Подсветка ячейки (например, логина)
  getCellColor(userId: string, header: string): string {
    const roles = this.userRoles[userId];
    if (!roles || roles.length === 0) return '';
    
    // Подсвечиваем только ячейку с логином
    if (header === 'userLogin') {
      if (roles.includes('admin') && roles.includes('student')) {
        return '#ffe0b2';
      } else if (roles.includes('admin')) {
        return '#ffcdd2';
      } else if (roles.includes('student')) {
        return '#c8e6c9';
      }
    }
    
    return '';
  }
}
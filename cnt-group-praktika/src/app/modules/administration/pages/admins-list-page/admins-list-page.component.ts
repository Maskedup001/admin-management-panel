import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../../domains/users/services/admin.service';
import { Admin } from '../../../../domains/users/models/admin.model'; 

@Component({
  selector: 'app-admins-list-page',
  templateUrl: './admins-list-page.component.html',
  styleUrls: ['./admins-list-page.component.css']
})
export class AdminsListPageComponent implements OnInit {
  admins: Admin[] = [];

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.adminService.getUsers().subscribe({
      next: (response) => {
        if (response.ok) {
          this.admins = response.admins;
        }
      },
      error: (err) => console.error('Ошибка:', err)
    });
  }
}
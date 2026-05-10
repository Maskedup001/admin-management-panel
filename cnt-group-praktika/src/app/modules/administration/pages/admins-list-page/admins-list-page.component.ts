import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../../domains/users/services/admin.service';

@Component({
  selector: 'app-admins-list-page',
  templateUrl: './admins-list-page.component.html',
  styleUrls: ['./admins-list-page.component.css']
})

export class AdminsListPageComponent implements OnInit {
  asideIndex: number = 1;
  admins: any[] = [];
  selectedAdmin: any | null = null;

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.loadAdmins();
  }

  loadAdmins(): void {
    this.adminService.getAdmins().subscribe({
      next: (res) => {
        this.admins = res.admins.map((a: any) => ({
          ...a,
          // формат булевых данных из БД
          is_active_admin: a.is_active_admin?.data ? a.is_active_admin.data[0] === 1 : (a.is_active_admin === 1 || a.is_active_admin === true)
        }));
      }
    });
  }

  onAdminSelect(admin: any) {
    this.asideIndex = 2;
    this.selectedAdmin = admin;
  }

  onAddBtnClick() {
    this.asideIndex = 1;
    this.selectedAdmin = null;
  }

  onAdminDeleted() {
    this.loadAdmins();
    this.onAddBtnClick();
  }
}
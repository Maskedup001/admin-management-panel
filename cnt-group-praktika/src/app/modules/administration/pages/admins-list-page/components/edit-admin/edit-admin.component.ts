import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../../../../../domains/users/services/admin.service';

@Component({
  selector: 'app-edit-admin',
  templateUrl: './edit-admin.component.html',
  styleUrls: ['./edit-admin.component.css']
})
export class EditAdminComponent implements OnChanges {
  @Input() selectedAdmin: any | null = null;
  @Output() adminUpdate = new EventEmitter<void>();
  @Output() adminDeleted = new EventEmitter<void>();

  editAdminForm: FormGroup;

  constructor(private fb: FormBuilder, private adminService: AdminService) {
    this.editAdminForm = this.fb.group({
      admin_login: ['', [Validators.required, Validators.minLength(2)]],
      is_active_admin: [true],
      admin_birth_date: ['', [Validators.required]]
    });
  }

  ngOnChanges() {
    if (this.selectedAdmin) {
      const status = this.selectedAdmin.is_active_admin;
      const isActive = status === true || status === 1 || (status?.data && status.data[0] === 1);

      let formattedDate = '';
      if (this.selectedAdmin.admin_birth_date) {
        const dateObj = new Date(this.selectedAdmin.admin_birth_date);
        if (!isNaN(dateObj.getTime())) {
          formattedDate = dateObj.toISOString().split('T')[0];
        }
      }

      this.editAdminForm.patchValue({
        admin_login: this.selectedAdmin.admin_login,
        is_active_admin: isActive,
        admin_birth_date: formattedDate
      });
    }
  }

  getFieldErrors(field: string) {
    return this.editAdminForm.get(field)?.errors;
  }

  onDelete() {
    const id = this.selectedAdmin?.admin_id;
    if (id && confirm(`Удалить администратора ${this.selectedAdmin.admin_login}?`)) {
      this.adminService.deleteAdmin(id).subscribe({
        next: () => {
          this.adminDeleted.emit();
          alert('Удалено успешно');
        },
        error: () => alert('Ошибка при удалении')
      });
    }
  }

  onSubmit() {
    const id = this.selectedAdmin?.admin_id;
    if (id && this.editAdminForm.valid) {
      const payload = {
        ...this.editAdminForm.value,
        is_active_admin: this.editAdminForm.value.is_active_admin ? 1 : 0
      };

      this.adminService.updateAdmin(id, payload).subscribe({
        next: () => {
          this.adminUpdate.emit();
          alert('Сохранено успешно');
        },
        error: (err) => {
          console.error('Ошибка PATCH:', err);
          if (err.status === 401) {
            alert('Ошибка 401: Сессия истекла. Перезайдите в систему (Login).');
          } else {
            alert('Ошибка сервера');
          }
        }
      });
    }
  }
}
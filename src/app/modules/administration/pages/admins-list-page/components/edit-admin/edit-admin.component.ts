import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../../../../../domains/users/services/admin.service';
import { Admin } from '../../../../../../domains/users/models/admin.model';

@Component({
  selector: 'app-edit-admin',
  templateUrl: './edit-admin.component.html',
  styleUrls: ['./edit-admin.component.css']
})
export class EditAdminComponent implements OnChanges {
  @Input() selectedAdmin: Admin | null = null; 
  @Output() adminUpdate = new EventEmitter<void>();

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
      const isActive = !!this.selectedAdmin.is_active_admin;

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

  onSubmit() {
    const id = this.selectedAdmin?.admin_id;
    if (id && this.editAdminForm.valid) {
      const payload: Partial<Admin> = {
        admin_login: this.editAdminForm.value.admin_login,
        admin_birth_date: this.editAdminForm.value.admin_birth_date,
        is_active_admin: this.editAdminForm.value.is_active_admin
      };

      this.adminService.updateAdmin(id, payload).subscribe({
        next: () => {
          this.adminUpdate.emit();
          alert('Сохранено успешно');
        },
        error: (err) => {
          console.error('Ошибка PATCH:', err);
          alert('Ошибка при обновлении');
        }
      });
    }
  }
}
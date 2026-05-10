import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../../../../../domains/users/services/admin.service';

@Component({
  selector: 'app-add-admin-form',
  templateUrl: './add-admin-form.component.html',
  styleUrls: ['./add-admin-form.component.css']
})
export class AddAdminFormComponent implements OnInit {
  @Output() adminCreated = new EventEmitter<void>();
  addAdminForm!: FormGroup;

  constructor(private fb: FormBuilder, private adminService: AdminService) {}

  ngOnInit(): void {
    this.addAdminForm = this.fb.group({
      admin_login: ['', [Validators.required, Validators.minLength(2)]],
      admin_password: ['', [Validators.required, Validators.minLength(4)]],
      is_active_admin: [true],
      admin_birth_date: ['', [Validators.required]]
    });
  }

  getFieldErrors(field: string) {
    return this.addAdminForm.get(field)?.errors;
  }

  addNewAdmin() {
    if (this.addAdminForm.valid) {
      const payload = {
        ...this.addAdminForm.value,
        is_active_admin: this.addAdminForm.value.is_active_admin ? 1 : 0
      };

      this.adminService.createAdmin(payload).subscribe({
        next: () => {
          this.adminCreated.emit();
          this.addAdminForm.reset({ is_active_admin: true });
          alert('Администратор создан');
        },
        error: (err) => alert(err.status === 401 ? 'Ошибка 401: Нет прав' : 'Ошибка при создании')
      });
    }
  }
}
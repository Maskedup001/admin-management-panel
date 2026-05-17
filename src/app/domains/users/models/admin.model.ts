export interface Admin {
  admin_id?: number;          // В базе: admin_id
  admin_login: string;       // В базе: admin_login
  admin_password_hash?: string; // В базе: admin_password_hash
  is_active_admin?: any;   // В базе: is_active_admin (0x01)
  admin_birth_date?: string;  // В базе: admin_birth_date
  created_at?: string;        // В базе: created_at
}
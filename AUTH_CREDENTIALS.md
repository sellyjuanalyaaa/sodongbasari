# Authentication Credentials

## Admin Login

Auth sudah aktif! Gunakan kredensial berikut untuk login:

**URL Login:** http://localhost/sodongbasari/login

**Admin Credentials:**
- Email: `admin@admin.com`
- Password: `password`

## Fitur Auth yang Tersedia

✅ Login
✅ Register  
✅ Forgot Password
✅ Reset Password
✅ Email Verification
✅ Two-Factor Authentication (2FA)
✅ Profile Management
✅ Password Change

## Admin Routes

Setelah login, Anda akan diarahkan ke:
- Dashboard: `/admin/dashboard`

Admin dapat mengakses:
- `/admin/posts` - Kelola Berita/Pengumuman
- `/admin/potentials` - Kelola Potensi Desa
- `/admin/institutions` - Kelola Lembaga/Institusi
- `/admin/demographics` - Kelola Data Demografi
- `/admin/budgets` - Kelola Anggaran
- `/admin/hero-settings` - Kelola Hero Images

## Settings Routes

- `/settings/profile` - Edit Profile
- `/settings/password` - Ubah Password
- `/settings/appearance` - Pengaturan Tampilan
- `/settings/two-factor` - Two-Factor Authentication

## Notes

- Database sudah di-seed dengan data contoh
- User admin sudah dibuat otomatis
- Semua middleware auth sudah terpasang

# Statistics Feature Documentation

## Overview
The Statistics feature allows admins to manage and display village statistics with infographic images. The public can view the latest statistics including population data, administrative regions, education levels, occupations, and religious demographics.

## Features Implemented

### Backend
1. **Migration**: `2026_01_16_155954_create_statistics_table.php`
   - Year (unique)
   - Infographic image (nullable)
   - Population data (total, male, female, families)
   - Administrative data (RT, RW, Dusun)
   - Education levels (6 categories)
   - Occupation types (5 categories)
   - Religious demographics (5 religions)

2. **Model**: `app/Models/Statistic.php`
   - All fields fillable
   - Integer casts for numeric fields

3. **Controller**: `app/Http/Controllers/Admin/StatisticController.php`
   - Full CRUD operations
   - Image upload with validation (max 5MB)
   - Auto-delete old images on update

4. **Routes**: Added to `routes/web.php`
   - `Route::resource('statistics', StatisticController::class)`

5. **Seeder**: `database/seeders/StatisticSeeder.php`
   - Sample data for 2026

### Frontend

#### Admin Pages
1. **Index**: `resources/js/Pages/Admin/Statistics/Index.tsx`
   - Table showing all statistics by year
   - Displays infographic status
   - Population summary (total, male, female, families)
   - Edit and delete actions with confirmation dialog

2. **Form**: `resources/js/Pages/Admin/Statistics/Form.tsx`
   - Comprehensive form with 5 sections:
     - General info (year, infographic upload with preview)
     - Population data (7 fields)
     - Education levels (6 fields)
     - Occupation types (5 fields)
     - Religious demographics (5 fields)
   - Image preview with remove option
   - Validation for all required fields

3. **Navigation**: Updated `AdminLayout.tsx`
   - Added "Statistik Desa" menu item with BarChart3 icon

#### Public Page
**Statistics Display**: `resources/js/Pages/Public/Statistics.tsx`
- Shows latest statistics by year
- Infographic image display at top
- 6 statistic cards with icons:
  - Population data (Users icon, orange theme)
  - Administrative regions (MapPin icon, blue theme)
  - Education levels (GraduationCap icon, emerald theme)
  - Occupation types (Briefcase icon, purple theme)
  - Religious demographics (Church icon, amber theme, full width)

## Database Schema

### Column Names
**Important**: Column names use `_sederajat` suffix for education:
- `sd_sederajat` (not `sd`)
- `smp_sederajat` (not `smp`)
- `sma_sederajat` (not `sma`)
- `lainnya` (not `pekerjaan_lainnya`)

### Statistics Table
```sql
- id (primary key)
- year (integer, unique)
- infographic_image (string, nullable)
- total_population (integer, default 0)
- male_population (integer, default 0)
- female_population (integer, default 0)
- total_families (integer, default 0)
- total_rt (integer, default 0)
- total_rw (integer, default 0)
- total_dusun (integer, default 0)
- tidak_sekolah (integer, default 0)
- sd_sederajat (integer, default 0)
- smp_sederajat (integer, default 0)
- sma_sederajat (integer, default 0)
- diploma (integer, default 0)
- sarjana (integer, default 0)
- petani (integer, default 0)
- pedagang (integer, default 0)
- pns (integer, default 0)
- wiraswasta (integer, default 0)
- lainnya (integer, default 0)
- islam (integer, default 0)
- kristen (integer, default 0)
- katolik (integer, default 0)
- hindu (integer, default 0)
- budha (integer, default 0)
- timestamps
```

## Usage

### Admin Panel
1. **Access**: Navigate to "Statistik Desa" in admin sidebar
2. **Create**: Click "Tambah Data" button
3. **Fill Form**: 
   - Enter year (required, unique)
   - Upload infographic image (optional, max 5MB)
   - Fill all population, education, occupation, and religion data
4. **Edit**: Click edit button on any record
5. **Delete**: Click delete button with confirmation dialog

### Public Display
- Automatically shows latest statistics by year
- Infographic displayed prominently at top
- Statistics organized in clean grid layout
- Color-coded cards with icons for easy reading
- Responsive design for mobile and desktop

## File Locations

### Backend
- Migration: `database/migrations/2026_01_16_155954_create_statistics_table.php`
- Model: `app/Models/Statistic.php`
- Controller: `app/Http/Controllers/Admin/StatisticController.php`
- Seeder: `database/seeders/StatisticSeeder.php`

### Frontend
- Admin Index: `resources/js/Pages/Admin/Statistics/Index.tsx`
- Admin Form: `resources/js/Pages/Admin/Statistics/Form.tsx`
- Public Display: `resources/js/Pages/Public/Statistics.tsx`
- Layout: `resources/js/layouts/AdminLayout.tsx` (navigation update)

## Image Storage
- Upload path: `storage/app/public/statistics/`
- Public URL: `/storage/statistics/{filename}`
- Auto-cleanup: Old images deleted on update/delete

## Validation Rules
- Year: required, integer
- Infographic: nullable, image file, max 5MB
- All data fields: required, integer, min 0

## Sample Data
Seeded data for 2026:
- Total population: 5,420
- Total families: 1,450
- Administrative: 4 Dusun, 8 RW, 24 RT
- Education data across 6 levels
- Occupation data across 5 categories
- Religious demographics across 5 religions

## Build Status
✅ Migration executed successfully
✅ Seeder run successfully
✅ Frontend built without errors
✅ All routes registered
✅ Navigation updated

# Admin Styling Guide - Minimalist Design System

## Overview
Sistem desain minimalis untuk admin panel dengan fokus pada **clean**, **modern**, dan **konsisten**.

---

## 🎨 Color Palette

### Primary Colors
- **Primary**: `orange-600` (#EA580C) - Tombol utama, aksen
- **Primary Hover**: `orange-700` - Hover state
- **Primary Light**: `orange-50` - Background highlight

### Neutral Colors
- **Gray 900**: Heading text
- **Gray 700**: Body text
- **Gray 500**: Secondary text, descriptions
- **Gray 400**: Placeholder, icons inactive
- **Gray 100**: Borders, dividers
- **Gray 50**: Background subtle hover
- **White**: Cards, backgrounds

### Semantic Colors
- **Success**: `emerald-600`, `emerald-50`
- **Warning**: `amber-600`, `amber-50`
- **Danger**: `red-600`, `red-50`
- **Info**: `blue-600`, `blue-50`

---

## 📐 Typography Scale

```tsx
// Page Headers
<h1 className="text-3xl font-bold text-gray-900 tracking-tight">
  Main Heading
</h1>
<p className="text-gray-500 mt-1">Description text</p>

// Card Headers
<h2 className="text-xl font-semibold text-gray-800">
  Card Title
</h2>

// Section Labels
<Label className="text-gray-700 font-medium">
  Field Label
</Label>
```

---

## 🧱 Component Patterns

### Page Header (Index Pages)
```tsx
<div className="flex justify-between items-start mb-8">
  <div>
    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
      Page Title
    </h1>
    <p className="text-gray-500 mt-1">
      Clear description of page purpose
    </p>
  </div>
  <Button className="bg-orange-600 hover:bg-orange-700 text-white shadow-sm">
    <Plus className="mr-2 h-4 w-4" /> Add New
  </Button>
</div>
```

### Page Header (Form Pages)
```tsx
<div className="flex items-center gap-4 mb-8">
  <Button variant="outline" size="icon" className="border-gray-200 hover:bg-gray-100">
    <ArrowLeft className="h-4 w-4 text-gray-600" />
  </Button>
  <div>
    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
      Form Title
    </h1>
    <p className="text-gray-500 mt-1">
      Contextual description
    </p>
  </div>
</div>
```

### Data Table Container
```tsx
<div className="rounded-lg border border-gray-100 bg-white shadow-sm overflow-hidden">
  <Table>
    {/* Content */}
  </Table>
</div>
```

### Form Card
```tsx
<Card className="bg-white border-gray-100 shadow-sm max-w-4xl">
  <CardContent className="p-6 space-y-6">
    {/* Form fields */}
  </CardContent>
</Card>
```

### Dashboard Stat Card
```tsx
<Card className="border-gray-100 shadow-sm bg-white hover:shadow-md transition-all duration-200 group">
  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
    <CardTitle className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
      Stat Label
    </CardTitle>
    <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center group-hover:scale-110 transition-transform">
      <Icon className="h-5 w-5 text-blue-600" />
    </div>
  </CardHeader>
  <CardContent>
    <div className="text-3xl font-bold text-gray-900">{value}</div>
    <p className="text-xs text-gray-400 mt-1">Subtitle</p>
  </CardContent>
</Card>
```

---

## 🎯 Form Inputs

### Standard Input
```tsx
<div className="space-y-2">
  <Label htmlFor="field" className="text-gray-700">
    Field Label
  </Label>
  <Input
    id="field"
    className="border-gray-200 focus:border-orange-500 focus:ring-orange-200"
    placeholder="Placeholder text..."
  />
  {errors.field && <p className="text-sm text-red-500">{errors.field}</p>}
</div>
```

### Select Dropdown
```tsx
<Select value={value} onValueChange={setValue}>
  <SelectTrigger className="border-gray-200 focus:ring-orange-200">
    <SelectValue placeholder="Choose..." />
  </SelectTrigger>
  <SelectContent className="bg-white border-gray-100">
    <SelectItem value="option1">Option 1</SelectItem>
  </SelectContent>
</Select>
```

### Textarea
```tsx
<Textarea
  className="resize-y border-gray-200 focus:border-orange-500 focus:ring-orange-200"
  rows={8}
  placeholder="Enter text..."
/>
```

---

## 🏷️ Status Badges

```tsx
// Category badges with specific colors
<span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border">
  {/* Blue - News */}
  <span className="bg-blue-50 text-blue-700 border-blue-100">
    Berita Desa
  </span>
  
  {/* Amber - Announcement */}
  <span className="bg-amber-50 text-amber-700 border-amber-100">
    Pengumuman
  </span>
  
  {/* Emerald - Activity */}
  <span className="bg-emerald-50 text-emerald-700 border-emerald-100">
    Kegiatan
  </span>
  
  {/* Purple - Article */}
  <span className="bg-purple-50 text-purple-700 border-purple-100">
    Artikel
  </span>
</span>
```

---

## 🔘 Buttons

### Primary Action
```tsx
<Button className="bg-orange-600 hover:bg-orange-700 text-white shadow-sm">
  <Plus className="mr-2 h-4 w-4" /> Primary Action
</Button>
```

### Secondary/Outline
```tsx
<Button variant="outline" className="border-gray-200 hover:bg-gray-100">
  Secondary
</Button>
```

### Danger/Destructive
```tsx
<Button variant="destructive" className="bg-red-600 hover:bg-red-700">
  Delete
</Button>
```

### Icon Button
```tsx
<Button variant="ghost" size="icon">
  <Pencil className="h-4 w-4" />
</Button>
```

---

## 📊 Table Design

```tsx
<Table>
  <TableHeader>
    <TableRow className="hover:bg-gray-50 border-b border-gray-100">
      <TableHead className="text-gray-500">Column</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow className="hover:bg-gray-50 border-b border-gray-100">
      <TableCell className="text-gray-700">Data</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

---

## ✨ Spacing System

- **mb-8**: Bottom margin untuk page headers
- **gap-6**: Grid gap untuk cards
- **p-6**: Card padding
- **space-y-6**: Vertical spacing dalam forms
- **space-y-2**: Spacing untuk form field groups

---

## 🎭 Animation & Transitions

```tsx
// Hover transitions
className="transition-all duration-200 hover:shadow-md"

// Icon scale on hover
className="group-hover:scale-110 transition-transform"

// Button with smooth transition
className="transition-colors hover:bg-gray-100"
```

---

## 📱 Responsive Breakpoints

```tsx
// Mobile first approach
<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">

// Stack on mobile, side-by-side on desktop
<div className="flex flex-col md:flex-row gap-4">
```

---

## ✅ Checklist untuk Halaman Baru

1. ✅ Page header dengan title (3xl bold) + description
2. ✅ Consistent spacing (mb-8 untuk header)
3. ✅ Cards dengan `border-gray-100 shadow-sm`
4. ✅ Inputs dengan focus state `focus:border-orange-500 focus:ring-orange-200`
5. ✅ Buttons dengan proper variant dan size
6. ✅ Error messages dengan `text-sm text-red-500`
7. ✅ Proper text colors (gray-900 heading, gray-700 body, gray-500 secondary)
8. ✅ Hover states untuk interactive elements
9. ✅ Loading states dengan Loader2 icon
10. ✅ Proper responsive classes

---

## 🚀 Quick Start Template

```tsx
import AdminLayout from '@/layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';
import { Button } from "@/components/ui/button";

export default function PageName() {
  return (
    <AdminLayout title="Page Title">
      <Head title="Page Title" />
      
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Page Title
          </h1>
          <p className="text-gray-500 mt-1">
            Description of what this page does
          </p>
        </div>
        <Button className="bg-orange-600 hover:bg-orange-700 text-white shadow-sm">
          Action
        </Button>
      </div>

      <div className="rounded-lg border border-gray-100 bg-white shadow-sm overflow-hidden">
        {/* Content */}
      </div>
    </AdminLayout>
  );
}
```

---

**Prinsip Utama:**
1. **Minimalis** - Hanya elemen yang dibutuhkan
2. **Konsisten** - Sama di semua halaman
3. **Clean** - White space yang cukup
4. **Readable** - Typography yang jelas
5. **Accessible** - Contrast ratio yang baik

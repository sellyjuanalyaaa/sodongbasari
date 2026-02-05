# Rich Text Editor untuk Berita dan Artikel

## Fitur yang Ditambahkan

Fitur Rich Text Editor telah berhasil ditambahkan ke bagian admin untuk membuat dan mengedit berita/artikel dengan format yang lebih rapi.

## Komponen yang Dimodifikasi/Ditambahkan

### 1. **RichTextEditor Component** (`resources/js/components/RichTextEditor.tsx`)
   - Komponen reusable untuk rich text editing menggunakan Tiptap
   - Toolbar lengkap dengan fitur:
     - **Text Formatting**: Bold, Italic, Underline, Strikethrough
     - **Headings**: H1, H2, H3
     - **Lists**: Bullet list dan Ordered list
     - **Text Alignment**: Left, Center, Right, Justify
     - **Insert**: Links dan Images
     - **Text Color**: Custom color picker
     - **Undo/Redo**: Untuk membatalkan dan mengulangi aksi

### 2. **Post Form** (`resources/js/pages/Admin/Posts/Form.tsx`)
   - Mengganti textarea biasa dengan RichTextEditor
   - Content yang disimpan dalam format HTML

### 3. **Public News Show** (`resources/js/pages/Public/News/Show.tsx`)
   - Tampilan berita di sisi public dengan styling yang rapi
   - Menggunakan Tailwind CSS prose classes untuk formatting yang konsisten
   - Custom styling untuk:
     - Heading dengan hierarki yang jelas
     - Paragraf dengan spasi yang tepat
     - List yang terformat dengan baik
     - Link dengan warna brand (#EFA00B)
     - Images dengan border radius dan shadow

### 4. **CSS Styling** (`resources/css/app.css`)
   - Custom CSS untuk ProseMirror editor
   - Styling untuk semua elemen HTML yang bisa dibuat di editor
   - Konsisten dengan design system yang ada

## Dependencies yang Ditambahkan

```json
{
  "@tiptap/react": "^2.x",
  "@tiptap/starter-kit": "^2.x",
  "@tiptap/extension-text-align": "^2.x",
  "@tiptap/extension-underline": "^2.x",
  "@tiptap/extension-link": "^2.x",
  "@tiptap/extension-image": "^2.x",
  "@tiptap/extension-text-style": "^2.x",
  "@tiptap/extension-color": "^2.x"
}
```

## Cara Menggunakan

### Di Admin Panel:
1. Buka halaman **Tambah Berita** atau **Edit Berita**
2. Gunakan toolbar di atas editor untuk memformat text:
   - Pilih text dan klik tombol **B** untuk Bold
   - Klik **H1**, **H2**, atau **H3** untuk membuat heading
   - Klik icon **List** untuk membuat bullet/ordered list
   - Klik icon **Align** untuk mengatur alignment text
   - Klik icon **Link** untuk menambahkan hyperlink
   - Klik icon **Image** untuk menambahkan gambar dari URL
   - Klik icon **Palette** untuk mengubah warna text
3. Content akan otomatis tersimpan dalam format HTML

### Di Public:
- Berita akan ditampilkan dengan formatting yang sama seperti di editor
- Semua styling (bold, italic, heading, list, dll) akan terlihat dengan rapi
- Link akan berwarna orange (#EFA00B) sesuai brand
- Images akan memiliki rounded corners dan shadow

## Fitur Keyboard Shortcuts

- **Ctrl+B**: Bold
- **Ctrl+I**: Italic
- **Ctrl+U**: Underline
- **Ctrl+Z**: Undo
- **Ctrl+Y**: Redo

## Contoh Penggunaan

1. **Membuat Heading**:
   - Klik tombol H1, H2, atau H3
   - Ketik judul section

2. **Membuat List**:
   - Klik tombol bullet atau numbered list
   - Ketik item pertama
   - Tekan Enter untuk item berikutnya

3. **Menambahkan Link**:
   - Select text yang ingin dijadikan link
   - Klik icon Link
   - Masukkan URL
   - Klik OK

4. **Menambahkan Image**:
   - Klik icon Image
   - Masukkan URL gambar
   - Klik OK

## Build & Deploy

Setelah melakukan perubahan, jalankan:

```bash
npm run build
```

Untuk development:

```bash
npm run dev
```

## Notes

- Content disimpan dalam format HTML di database
- Semua HTML yang dihasilkan sudah aman dan ter-sanitize oleh Tiptap
- Styling mengikuti design system yang sudah ada dengan warna brand orange (#EFA00B)
- Editor responsive dan mobile-friendly

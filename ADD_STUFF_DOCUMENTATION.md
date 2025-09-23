# Add Stuff Page Documentation

## Overview
Halaman "Tambah Produk" untuk menambahkan item baru ke platform thrifting, dibuat sesuai dengan desain yang diberikan menggunakan Solid.js.

## Features

### 🎨 **Layout & Design**
- **Header** dengan tombol Back dan judul "Tambah Produk"
- **Form lengkap** dengan semua field yang diperlukan
- **Responsive design** menggunakan Tailwind CSS
- **Upload area** untuk foto produk dengan drag & drop UI

### 📝 **Form Fields**
1. **Foto Produk** - Upload area dengan placeholder icon
2. **Nama Produk** - Text input dengan counter (0/255)
3. **Deskripsi Produk** - Textarea dengan counter (0/3000)
4. **Kategori** - Dropdown (Top/Bottom/Pants/Outerwear)
5. **Harga** - Text input dengan placeholder "Atur"
6. **Stok** - Number input (required field)
7. **Min. Jumlah Pembelian** - Number input (required field)
8. **Kondisi** - Dropdown (Baru/Pernah pakai)
9. **Pre-order** - Checkbox option
10. **Kontak** - Text input untuk informasi kontak

### 🔧 **Interactive Features**
- **Character counters** untuk nama produk (255) dan deskripsi (3000)
- **Form validation** dengan required fields
- **Dropdown selections** dengan custom styling
- **Back button** dengan navigasi history
- **Submit button** "Tampilkan" untuk memproses form
- **Hover effects** dan smooth transitions

### 📱 **Technical Implementation**
- ✅ **Solid.js** reactive signals untuk form state
- ✅ **TypeScript** type safety
- ✅ **Responsive design** dengan Tailwind CSS
- ✅ **Form handling** dengan event management
- ✅ **State management** menggunakan createSignal

## Routes
- **URL**: `/add-stuff`
- **Navigation**: Accessible dari Settings page sidebar
- **Back button**: Menggunakan browser history

## Form State Management
```typescript
const [formData, setFormData] = createSignal({
  productName: '',
  description: '',
  category: '',
  price: '',
  stock: '',
  minOrder: '',
  condition: '',
  contact: ''
});
```

## Usage
1. **Navigate** ke `/add-stuff` atau click "Add stuff" dari Settings
2. **Upload** foto produk di area upload
3. **Fill form** dengan informasi produk
4. **Select** kategori dan kondisi dari dropdown
5. **Set** harga, stok, dan minimum order
6. **Add contact** information
7. **Submit** dengan tombol "Tampilkan"

## Validation
- **Required fields**: Stok dan Min. Jumlah Pembelian
- **Character limits**: Nama produk (255), Deskripsi (3000)
- **Input types**: Number untuk stok dan min order
- **Dropdown validation** untuk kategori dan kondisi

## Future Enhancements
- File upload functionality untuk foto
- Form validation feedback
- Success/error messages
- Integration dengan backend API
- Image preview dan crop functionality
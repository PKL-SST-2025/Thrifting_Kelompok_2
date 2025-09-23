# Shop Page Documentation

## Overview
Halaman "My Shop" untuk menampilkan dan mengelola produk-produk yang dijual oleh user, dibuat dengan layout mirip My Profile wishlist menggunakan Solid.js.

## Features

### 🎨 **Layout & Design**
- **Header** dengan tombol Back, title "My Shop", dan button "Add Stuff"
- **Profile section** dengan foto profile, nama seller, dan statistik
- **Tab navigation** untuk Active Products dan Sold Items
- **Product grid** layout seperti wishlist di My Profile
- **Empty state** untuk kondisi tidak ada produk

### 👤 **Profile Section**
- **Profile image** dengan inisial "C"
- **Seller info**: Nama dan "Seller since 2024"
- **Statistics**: 
  - Active Products count
  - Sold Items count
- **Background abu-abu** sesuai design My Profile

### 📱 **Tab Navigation**
1. **My Products** - Menampilkan produk aktif yang dijual
2. **Sold Items** - Menampilkan produk yang sudah terjual

### 🛍️ **Product Grid**
- **Layout 3 kolom** responsive (1 kolom mobile, 2 tablet, 3 desktop)
- **Product cards** dengan:
  - Image placeholder dengan icon
  - Nama produk
  - Deskripsi
  - Harga
  - Status (Active/Sold)
  - Action buttons (Edit/Delete untuk active, badge SOLD untuk sold items)

### 🔧 **Interactive Features**
- **Add Stuff button** di header → navigasi ke `/add-stuff`
- **Tab switching** antara Active dan Sold products
- **Edit/Delete buttons** untuk produk aktif
- **Load More** button untuk pagination
- **Back navigation** dengan browser history
- **Hover effects** pada product cards

### 📱 **Technical Implementation**
- ✅ **Solid.js** reactive signals untuk state management
- ✅ **Mock data** untuk demo produk
- ✅ **Responsive grid** dengan Tailwind CSS
- ✅ **Tab filtering** berdasarkan status produk
- ✅ **Dynamic counters** untuk statistik
- ✅ **Conditional rendering** untuk empty states

## Data Structure
```typescript
const [myProducts] = createSignal([
  {
    id: number,
    name: string,
    description: string,
    price: string,
    image: string,
    status: 'active' | 'sold'
  }
]);
```

## Routes
- **URL**: `/shop`
- **Navigation**: Accessible dari Settings page sidebar
- **Add Stuff**: Button mengarah ke `/add-stuff`
- **Back button**: Menggunakan browser history

## Features Breakdown

### 🎯 **Header Actions**
- **Back Button**: Kembali ke halaman sebelumnya
- **Add Stuff Button**: Primary CTA untuk menambah produk baru

### 📊 **Statistics**
- **Real-time counting** berdasarkan filter status
- **Active Products**: Produk yang masih dijual
- **Sold Items**: Produk yang sudah terjual

### 🎨 **Visual States**
- **Active Products**: Edit/Delete buttons
- **Sold Items**: "SOLD" badge
- **Empty State**: Icon + message + CTA button
- **Loading State**: Ready untuk implementasi

### 📋 **Product Management**
- **View**: Grid layout untuk easy browsing
- **Filter**: Tab-based filtering (Active/Sold)
- **Actions**: Edit dan Delete untuk active products
- **Add New**: Prominent Add Stuff button

## Usage Flow
1. **Navigate** ke `/shop` dari Settings sidebar
2. **View products** dalam grid layout
3. **Switch tabs** antara Active dan Sold
4. **Manage products**: Edit/Delete active items
5. **Add new product**: Click "Add Stuff" → `/add-stuff`

## Integration Points
- **Settings Page**: Menu "Shop" di Account Settings
- **Add Stuff Page**: Accessible via header button
- **Product Management**: Edit/Delete functionality ready
- **Statistics**: Dynamic counting based on product status

## Future Enhancements
- **Real product images** integration
- **Product search** dan filtering
- **Sales analytics** dashboard
- **Bulk operations** untuk products
- **Product status management** (draft, active, paused)
- **Integration dengan payment system**
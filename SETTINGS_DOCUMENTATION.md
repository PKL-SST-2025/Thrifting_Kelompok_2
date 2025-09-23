# Settings Page Documentation

## Overview
Settings page yang telah dibuat sesuai dengan desain yang diberikan, menggunakan Solid.js framework.

## Features
- **Sidebar Navigation**: Dengan tiga kategori utama (Account Settings, Settings, Support)
- **My Profile Section**: Bagian utama yang menampilkan:
  - Profile image placeholder (dengan inisial "C")
  - Username yang dapat diedit
  - Button "Edit Profile" yang berubah menjadi "Save Profile"
  - Form fields untuk Email, Bio, dan Location
  - Wishlist dan Recently Viewed products
  - Grid produk dengan placeholder data

## Components Structure
```
Settings/
├── Main Component (Settings)
├── MyProfileSection
├── AddStuffSection (placeholder)
├── NotificationsSection (placeholder)
├── LanguageSection (placeholder)
├── StoresSection (placeholder)
├── SupportSection (placeholder)
└── FAQSection (placeholder)
```

## Key Features in My Profile Section
1. **Editable Profile**: Click "Edit Profile" untuk mengaktifkan mode edit
2. **Profile Image**: Placeholder dengan inisial user
3. **Camera Icon**: Muncul saat mode edit untuk upload foto
4. **Form Fields**: Email, Bio, Location yang responsive
5. **Product Sections**: Wishlist dan Recently Viewed dengan grid layout

## Styling
- Menggunakan Tailwind CSS
- Responsive design
- Red color scheme untuk branding
- Smooth transitions dan hover effects

## Routes
- Accessible di `/settings`
- **Note**: Profile page (`/profile`) telah dihapus dan digantikan dengan Settings page
- Sudah ditambahkan ke routing di App.tsx

## Usage
1. Navigate ke `/settings`
2. Click pada menu sidebar untuk switch section
3. Di "My profile", click "Edit Profile" untuk edit informasi
4. Save changes dengan "Save Profile" button
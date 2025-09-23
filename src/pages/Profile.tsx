import { Component, createSignal } from 'solid-js';
import { useNavigate } from '@solidjs/router';

const Profile: Component = () => {
  const navigate = useNavigate();
  const [showNewPassword, setShowNewPassword] = createSignal(false);
  const [profileImage, setProfileImage] = createSignal<string | null>(null);
  const [isDragOver, setIsDragOver] = createSignal(false);
  const [formData, setFormData] = createSignal({
    namaDepan: 'Conrad',
    namaBelakang: 'Fisher',
    alamatEmail: 'Conradfisher29@gmail.com',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleInputChange = (field: string) => (e: Event) => {
    const target = e.target as HTMLInputElement;
    setFormData(prev => ({
      ...prev,
      [field]: target.value
    }));
  };

  const handleImageUpload = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const file = target.files?.[0];
    if (file) {
      processImageFile(file);
    }
  };

  const removeProfileImage = () => {
    setProfileImage(null);
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer?.files;
    if (files && files.length > 0) {
      const file = files[0];
      processImageFile(file);
    }
  };

  const processImageFile = (file: File) => {
    // Validasi ukuran file (maksimal 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Ukuran file terlalu besar. Maksimal 5MB.');
      return;
    }
    
    // Validasi tipe file
    if (!file.type.startsWith('image/')) {
      alert('File harus berupa gambar (JPG, PNG, GIF).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setProfileImage(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData());
  };

  const handlePasswordChange = (e: Event) => {
    e.preventDefault();
    // Handle password change logic here
    console.log('Password change:', {
      currentPassword: formData().currentPassword,
      newPassword: formData().newPassword,
      confirmPassword: formData().confirmPassword
    });
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div class="min-h-screen bg-gray-50">
      {/* Header */}
      <div class="bg-white shadow-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between h-16">
            <div class="flex items-center">
              <button 
                onClick={goBack}
                class="flex items-center text-gray-600 hover:text-gray-900 mr-4"
              >
                <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
                Back
              </button>
              <h1 class="text-xl font-semibold text-gray-900">My Profile</h1>
            </div>
            <div class="flex items-center space-x-4">
              <span class="text-gray-700">Hi, Conrad</span>
              <div class="relative">
                {profileImage() ? (
                  <img 
                    src={profileImage()!} 
                    alt="Profile" 
                    class="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <div class="w-8 h-8 bg-red-500 rounded-full"></div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="max-w-2xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Profile Information Form */}
        <form onSubmit={handleSubmit} class="space-y-6">
          <div class="bg-white shadow rounded-lg p-6">
            <div class="space-y-6">
              {/* Profile Picture Section */}
              <div class="flex flex-col items-center space-y-4">
                <div 
                  class={`relative transition-all duration-200 ${isDragOver() ? 'scale-105' : ''}`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  {profileImage() ? (
                    <img 
                      src={profileImage()!} 
                      alt="Profile" 
                      class="w-24 h-24 rounded-full object-cover border-4 border-gray-200 shadow-lg"
                    />
                  ) : (
                    <div class={`w-24 h-24 bg-red-500 rounded-full border-4 ${isDragOver() ? 'border-blue-400 bg-blue-500' : 'border-gray-200'} flex items-center justify-center shadow-lg transition-colors`}>
                      <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  )}
                  {profileImage() && (
                    <button
                      type="button"
                      onClick={removeProfileImage}
                      class="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg"
                      title="Hapus foto profil"
                    >
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
                
                <div class="flex flex-col items-center space-y-2">
                  <div 
                    class={`border-2 border-dashed rounded-lg p-4 transition-colors ${isDragOver() ? 'border-blue-400 bg-blue-50' : 'border-gray-300'}`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    <label class="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors inline-flex items-center">
                      <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Upload Foto Profil
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        class="hidden"
                      />
                    </label>
                    <p class="text-sm text-gray-500 mt-2 text-center">
                      atau seret & lepas file gambar di sini
                    </p>
                  </div>
                  <p class="text-xs text-gray-400 text-center">JPG, PNG, atau GIF (max 5MB)</p>
                </div>
              </div>

              <div class="space-y-4">
                <div>
                  <label for="namaDepan" class="block text-sm font-medium text-gray-700 mb-1">
                    Nama Depan
                  </label>
                  <input
                    type="text"
                    id="namaDepan"
                    name="namaDepan"
                    value={formData().namaDepan}
                    onInput={handleInputChange('namaDepan')}
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label for="namaBelakang" class="block text-sm font-medium text-gray-700 mb-1">
                    Nama Belakang
                  </label>
                  <input
                    type="text"
                    id="namaBelakang"
                    name="namaBelakang"
                    value={formData().namaBelakang}
                    onInput={handleInputChange('namaBelakang')}
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  </div>

                <div>
                  <label for="alamatEmail" class="block text-sm font-medium text-gray-700 mb-1">
                    Alamat Email
                  </label>
                  <input
                    type="email"
                    id="alamatEmail"
                    name="alamatEmail"
                    value={formData().alamatEmail}
                    onInput={handleInputChange('alamatEmail')}
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <button
                  type="submit"
                  class="w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  GANTI RINCIAN ANDA
                </button>
              </div>
            </div>
          </div>
        </form>

        {/* Password Change Form */}
        <form onSubmit={handlePasswordChange} class="mt-8">
          <div class="bg-white shadow rounded-lg p-6">
            <h2 class="text-lg font-medium text-gray-900 mb-4">Ganti Kata Sandi</h2>
            
            <div class="space-y-4">
              <div>
                <input
                  type="password"
                  name="currentPassword"
                  placeholder="Kata Sandi Lama"
                  value={formData().currentPassword}
                  onInput={handleInputChange('currentPassword')}
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div class="relative">
                <input
                  type={showNewPassword() ? "text" : "password"}
                  name="newPassword"
                  placeholder="New Password"
                  value={formData().newPassword}
                  onInput={handleInputChange('newPassword')}
                  class="w-full px-3 py-2 pr-20 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword())}
                  class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  <span class="text-sm mr-2">Show</span>
                  {showNewPassword() ? (
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L8.464 8.464M21.536 15.536a10.002 10.002 0 00-8.07-8.07m0 0L15.536 8.464" />
                    </svg>
                  ) : (
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>

              <div>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData().confirmPassword}
                  onInput={handleInputChange('confirmPassword')}
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <button
                type="submit"
                class="w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                GANTI KATA SANDI
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Footer */}
      <footer class="bg-gray-800 text-white py-12 mt-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 class="text-xl font-bold mb-4">THRIFTING</h3>
              <p class="text-gray-300 mb-4">Discover Your World of Styles.</p>
              <div class="space-y-2 text-sm text-gray-300">
                <p>Layanan panduan konsumen :</p>
                <p>Email : 1234@gmail.com</p>
                <p>No. Tlp : +62 8123 456 789</p>
                <p>Direktorat Jenderal Perlindungan Konsumen dan Tertib</p>
                <p>Niaga Kementerian Perdagangan RI</p>
                <p>WhatsApp : +62 8123 456 789</p>
              </div>
            </div>
            
            <div>
              <h4 class="font-semibold mb-4">BANTUAN</h4>
              <ul class="space-y-2 text-sm text-gray-300">
                <li><a href="#" class="hover:text-white">Tentang Kami</a></li>
                <li><a href="#" class="hover:text-white">Pengiriman</a></li>
                <li><a href="#" class="hover:text-white">Penukaran</a></li>
                <li><a href="#" class="hover:text-white">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h4 class="font-semibold mb-4">KONTAK</h4>
              <div class="flex space-x-4">
                <a href="#" class="text-gray-300 hover:text-white">
                  <span class="sr-only">Facebook</span>
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M20 10C20 4.477 15.523 0 10 0S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z" clip-rule="evenodd" />
                  </svg>
                </a>
                <a href="#" class="text-gray-300 hover:text-white">
                  <span class="sr-only">Instagram</span>
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clip-rule="evenodd" />
                  </svg>
                </a>
                <a href="#" class="text-gray-300 hover:text-white">
                  <span class="sr-only">Twitter</span>
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Profile;
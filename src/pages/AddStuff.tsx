import { createSignal } from 'solid-js';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AddStuff = () => {
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

  const [isPreorder, setIsPreorder] = createSignal(false);

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    console.log('Form submitted:', formData());
    // Add your submit logic here
  };

  const handleBackClick = () => {
    // Navigate back logic
    window.history.back();
  };

  return (
    <div class="min-h-screen bg-gray-50">
      <Navbar />
      
      <div class="max-w-4xl mx-auto px-4 py-8">
        {/* Header with Back Button */}
        <div class="flex items-center mb-8">
          <button 
            onClick={handleBackClick}
            class="flex items-center text-gray-600 hover:text-gray-800 mr-4"
          >
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          <h1 class="text-2xl font-bold text-gray-900">Tambah Produk</h1>
        </div>

        {/* Form */}
        <div class="bg-white rounded-lg shadow-sm p-8">
          <form onSubmit={handleSubmit} class="space-y-6">
            
            {/* Foto Produk */}
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Foto Produk
              </label>
              <div class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-red-400 transition-colors">
                <svg class="mx-auto h-12 w-12 text-gray-400 mb-4" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <div class="text-red-500 text-sm font-medium mb-2">+ Tambah foto</div>
              </div>
            </div>

            {/* Nama Produk */}
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Nama Produk
              </label>
              <input
                type="text"
                value={formData().productName}
                onInput={(e) => updateFormData('productName', e.currentTarget.value)}
                placeholder="Masukkan Nama Produk"
                class="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
              />
              <div class="text-right text-sm text-gray-500 mt-1">
                {formData().productName.length}/255
              </div>
            </div>

            {/* Deskripsi Produk */}
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Deskripsi Produk
              </label>
              <textarea
                value={formData().description}
                onInput={(e) => updateFormData('description', e.currentTarget.value)}
                placeholder="Masukkan Deskripsi Produk"
                rows={4}
                class="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
              />
              <div class="text-right text-sm text-gray-500 mt-1">
                {formData().description.length}/3000
              </div>
            </div>

            {/* Kategori */}
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Kategori
              </label>
              <div class="relative">
                <select
                  value={formData().category}
                  onChange={(e) => updateFormData('category', e.currentTarget.value)}
                  class="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 appearance-none bg-white"
                >
                  <option value="">Kategori (Top / Bottom / Pants / Outerwear)</option>
                  <option value="top">Top</option>
                  <option value="bottom">Bottom</option>
                  <option value="pants">Pants</option>
                  <option value="outerwear">Outerwear</option>
                </select>
                <svg class="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Harga */}
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Harga
              </label>
              <input
                type="text"
                value={formData().price}
                onInput={(e) => updateFormData('price', e.currentTarget.value)}
                placeholder="Atur"
                class="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
              />
            </div>

            {/* Stok */}
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Stok <span class="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={formData().stock}
                onInput={(e) => updateFormData('stock', e.currentTarget.value)}
                placeholder="0"
                class="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
              />
            </div>

            {/* Min. Jumlah Pembelian */}
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Min. Jumlah Pembelian <span class="text-red-500">*</span>
              </label>
              <input
                type="number"
                value={formData().minOrder}
                onInput={(e) => updateFormData('minOrder', e.currentTarget.value)}
                placeholder="0"
                class="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
              />
            </div>

            {/* Kondisi */}
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Kondisi
              </label>
              <div class="relative">
                <select
                  value={formData().condition}
                  onChange={(e) => updateFormData('condition', e.currentTarget.value)}
                  class="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 appearance-none bg-white"
                >
                  <option value="">Kondisi (Baru / Pernah pakai)</option>
                  <option value="new">Baru</option>
                  <option value="used">Pernah pakai</option>
                </select>
                <svg class="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Pre-order Checkbox */}
            <div class="flex items-center space-x-3">
              <input
                type="checkbox"
                id="preorder"
                checked={isPreorder()}
                onChange={(e) => setIsPreorder(e.currentTarget.checked)}
                class="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500"
              />
              <label for="preorder" class="text-sm text-gray-700">
                Pre-order
              </label>
            </div>

            {/* Kontak */}
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Kontak
              </label>
              <input
                type="text"
                value={formData().contact}
                onInput={(e) => updateFormData('contact', e.currentTarget.value)}
                placeholder="Kontak"
                class="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
              />
            </div>

            {/* Submit Button */}
            <div class="pt-6">
              <button
                type="submit"
                class="w-full bg-gray-800 text-white py-4 px-6 rounded-lg font-medium hover:bg-gray-900 transition-colors"
              >
                Tampilkan
              </button>
            </div>

          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AddStuff;
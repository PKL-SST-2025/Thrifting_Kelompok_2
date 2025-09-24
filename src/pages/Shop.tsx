import { createSignal } from 'solid-js';
import { A } from '@solidjs/router';

const Shop = () => {
  const [activeTab, setActiveTab] = createSignal('products');

  // Mock data untuk produk yang dijual
  const [myProducts, setMyProducts] = createSignal([
    {
      id: 1,
      name: 'Thrifting',
      description: 'Polo T-shirt Women - Ivory',
      price: 'Rp. 129.000,00',
      image: '/placeholder-product.jpg',
      status: 'active'
    },
    {
      id: 2,
      name: 'Thrifting',
      description: 'Vintage Jacket - Navy',
      price: 'Rp. 250.000,00',
      image: '/placeholder-product.jpg',
      status: 'active'
    },
    {
      id: 3,
      name: 'Thrifting',
      description: 'Denim Pants - Blue',
      price: 'Rp. 180.000,00',
      image: '/placeholder-product.jpg',
      status: 'sold'
    },
    {
      id: 4,
      name: 'Thrifting',
      description: 'Cotton Dress - White',
      price: 'Rp. 160.000,00',
      image: '/placeholder-product.jpg',
      status: 'active'
    },
    {
      id: 5,
      name: 'Thrifting',
      description: 'Sweater - Brown',
      price: 'Rp. 140.000,00',
      image: '/placeholder-product.jpg',
      status: 'active'
    },
    {
      id: 6,
      name: 'Thrifting',
      description: 'Skirt - Black',
      price: 'Rp. 110.000,00',
      image: '/placeholder-product.jpg',
      status: 'active'
    }
  ]);

  const handleEdit = (id: number) => {
    // For demo, append " (Edited)" to description
    setMyProducts(prev => prev.map(p => p.id === id ? { ...p, description: p.description + ' (Edited)' } : p));
  };

  const handleDelete = (id: number) => {
    if (!confirm('Hapus produk ini?')) return;
    setMyProducts(prev => prev.filter(p => p.id !== id));
  };

  return (
    <div class="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-gray-100">
      {/* Header with Add Stuff Button */}
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div class="flex items-center gap-3">
          <div class="w-2 h-8 bg-gradient-to-b from-purple-600 to-indigo-600 rounded-full"></div>
          <h2 class="text-2xl sm:text-3xl font-bold text-gray-900">My Shop</h2>
        </div>
        <A
          href="/add-stuff"
          class="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M12 4v16m8-8H4" />
          </svg>
          Add New Product
        </A>
      </div>

      {/* Profile Header */}
      <div class="bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 rounded-2xl p-6 sm:p-8 mb-8 relative border border-purple-200/50 shadow-lg overflow-hidden">
        {/* Decorative Elements */}
        <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-200/30 to-indigo-200/30 rounded-full -translate-y-16 translate-x-16"></div>
        <div class="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-200/40 to-purple-200/40 rounded-full translate-y-12 -translate-x-12"></div>
        
        <div class="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {/* Profile Image */}
          <div class="relative">
            <div class="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 rounded-2xl flex items-center justify-center shadow-xl ring-4 ring-white/50 backdrop-blur-sm">
              <span class="text-white text-2xl sm:text-3xl font-bold tracking-wider">C</span>
            </div>
            <div class="absolute -bottom-1 -right-1 w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl border-3 border-white shadow-lg flex items-center justify-center">
              <svg class="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
          </div>

          {/* Shop Info */}
          <div class="flex-1 text-center sm:text-left">
            <h3 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Hi, Conrad</h3>
            <p class="text-gray-600 font-medium mb-4">Professional Seller since 2024</p>
            <div class="flex flex-wrap justify-center sm:justify-start gap-4 sm:gap-6">
              <div class="bg-white/60 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/50">
                <span class="text-sm text-gray-600 block">Active Products</span>
                <span class="text-xl font-bold text-gray-900">{myProducts().filter(p => p.status === 'active').length}</span>
              </div>
              <div class="bg-white/60 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/50">
                <span class="text-sm text-gray-600 block">Items Sold</span>
                <span class="text-xl font-bold text-gray-900">{myProducts().filter(p => p.status === 'sold').length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div class="flex flex-wrap gap-2 sm:gap-4 mb-8">
        <button 
          onClick={() => setActiveTab('products')}
          class={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
            activeTab() === 'products'
              ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg transform scale-105'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800'
          }`}
        >
          My Products ({myProducts().filter(p => p.status === 'active').length})
        </button>
        <button 
          onClick={() => setActiveTab('sold')}
          class={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
            activeTab() === 'sold'
              ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg transform scale-105'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800'
          }`}
        >
          Sold Items ({myProducts().filter(p => p.status === 'sold').length})
        </button>
      </div>

      {/* Products Grid */}
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {myProducts()
          .filter(product => activeTab() === 'products' ? product.status === 'active' : product.status === 'sold')
          .map((product) => (
            <div class="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 group">
              {/* Product Image */}
              <div class="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden flex items-center justify-center">
                <div class="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div class="text-center z-10">
                  <svg class="w-16 h-16 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span class="text-gray-600 font-medium">{product.name}</span>
                </div>
                
                {product.status === 'sold' && (
                  <div class="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <span class="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-xl font-bold text-lg shadow-xl">
                      SOLD OUT
                    </span>
                  </div>
                )}
              </div>
              
              {/* Product Info */}
              <div class="p-6 space-y-3">
                <div>
                  <h4 class="font-semibold text-gray-900 text-lg">{product.name}</h4>
                  <p class="text-gray-600 text-sm leading-relaxed">{product.description}</p>
                </div>
                
                <div class="flex items-center justify-between pt-2">
                  <p class="font-bold text-gray-900 text-xl">{product.price}</p>
                  
                  {product.status === 'active' && (
                    <div class="flex gap-2">
                      <button class="bg-blue-100 text-blue-700 px-3 py-2 rounded-lg hover:bg-blue-200 transition-colors font-medium text-sm" onClick={() => handleEdit(product.id)}>
                        Edit
                      </button>
                      <button class="bg-red-100 text-red-700 px-3 py-2 rounded-lg hover:bg-red-200 transition-colors font-medium text-sm" onClick={() => handleDelete(product.id)}>
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Empty State */}
      {myProducts().filter(product => activeTab() === 'products' ? product.status === 'active' : product.status === 'sold').length === 0 && (
        <div class="text-center py-12">
          <svg class="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
          <h3 class="text-lg font-medium text-gray-900 mb-2">
            {activeTab() === 'products' ? 'No Active Products' : 'No Sold Items'}
          </h3>
          <p class="text-gray-600 mb-4">
            {activeTab() === 'products' 
              ? 'Start selling by adding your first product!' 
              : 'You haven\'t sold any items yet.'}
          </p>
          {activeTab() === 'products' && (
            <A
              href="/add-stuff"
              class="inline-flex items-center bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:from-purple-700 hover:to-indigo-700 transition-colors"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Your First Product
            </A>
          )}
        </div>
      )}

      {/* Load More Button */}
      {myProducts().filter(product => activeTab() === 'products' ? product.status === 'active' : product.status === 'sold').length > 0 && (
        <div class="text-center mt-8">
          <button class="px-8 py-3 border-2 border-gray-900 text-gray-900 font-medium rounded-lg hover:bg-gray-900 hover:text-white transition-colors">
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default Shop;
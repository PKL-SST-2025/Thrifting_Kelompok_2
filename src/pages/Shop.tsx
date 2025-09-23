import { createSignal } from 'solid-js';
import { A } from '@solidjs/router';

const Shop = () => {
  const [activeTab, setActiveTab] = createSignal('products');

  // Mock data untuk produk yang dijual
  const [myProducts] = createSignal([
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

  return (
    <div class="bg-white rounded-lg shadow-sm p-8">
      {/* Header with Add Stuff Button */}
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl font-bold text-gray-900">Shop</h2>
        <A
          href="/add-stuff"
          class="bg-red-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-red-600 transition-colors flex items-center"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Stuff
        </A>
      </div>

      {/* Profile Header */}
      <div class="bg-gray-200 rounded-lg p-8 mb-6 relative">
        <div class="flex items-center space-x-6">
          {/* Profile Image */}
          <div class="w-24 h-24 bg-gray-400 rounded-full flex items-center justify-center">
            <span class="text-white text-2xl font-bold">C</span>
          </div>

          {/* Shop Info */}
          <div class="flex-1">
            <h3 class="text-2xl font-bold text-gray-900">Hi, Conrad</h3>
            <p class="text-gray-600 mt-1">Seller since 2024</p>
            <div class="flex space-x-6 mt-2">
              <span class="text-sm text-gray-500">
                <strong class="text-gray-900">{myProducts().filter(p => p.status === 'active').length}</strong> Active Products
              </span>
              <span class="text-sm text-gray-500">
                <strong class="text-gray-900">{myProducts().filter(p => p.status === 'sold').length}</strong> Sold Items
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div class="flex space-x-8 mb-6">
        <button 
          onClick={() => setActiveTab('products')}
          class={`text-lg font-medium pb-2 transition-colors ${
            activeTab() === 'products'
              ? 'text-gray-900 border-b-2 border-red-500'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          My Products ({myProducts().filter(p => p.status === 'active').length})
        </button>
        <button 
          onClick={() => setActiveTab('sold')}
          class={`text-lg font-medium pb-2 transition-colors ${
            activeTab() === 'sold'
              ? 'text-gray-900 border-b-2 border-red-500'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Sold Items ({myProducts().filter(p => p.status === 'sold').length})
        </button>
      </div>

      {/* Products Grid */}
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {myProducts()
          .filter(product => activeTab() === 'products' ? product.status === 'active' : product.status === 'sold')
          .map((product) => (
            <div class="bg-gray-100 rounded-lg p-4 hover:shadow-md transition-shadow">
              {/* Product Image */}
              <div class="aspect-square bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                <svg class="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              
              {/* Product Info */}
              <div class="space-y-2">
                <h4 class="font-medium text-gray-900">{product.name}</h4>
                <p class="text-sm text-gray-600">{product.description}</p>
                <div class="flex items-center justify-between">
                  <p class="font-semibold text-gray-900">{product.price}</p>
                  {product.status === 'sold' && (
                    <span class="text-xs bg-gray-500 text-white px-2 py-1 rounded">
                      SOLD
                    </span>
                  )}
                  {product.status === 'active' && (
                    <div class="flex space-x-2">
                      <button class="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600">
                        Edit
                      </button>
                      <button class="text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">
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
              class="inline-flex items-center bg-red-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-600 transition-colors"
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
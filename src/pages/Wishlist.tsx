import { createSignal, For } from 'solid-js';
import { A } from '@solidjs/router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Wishlist = () => {
  const [viewMode, setViewMode] = createSignal('grid');
  const [sortBy, setSortBy] = createSignal('recent');
  const [filterCategory, setFilterCategory] = createSignal('all');

  // Sample wishlist data
  const [wishlistItems, setWishlistItems] = createSignal([
    {
      id: 1,
      name: 'Vintage Denim Jacket',
      price: 450000,
      originalPrice: 800000,
      image: '/src/assets/1000021576.jpg',
      seller: 'ThriftStore01',
      condition: 'Excellent',
      category: 'Outerwear',
      addedDate: '2024-01-15',
      available: true,
      rating: 4.8,
      reviews: 23
    },
    {
      id: 2,
      name: 'Classic Leather Boots',
      price: 320000,
      originalPrice: 650000,
      image: '/src/assets/abbey road (1969).jpg',
      seller: 'VintageHub',
      condition: 'Good',
      category: 'Footwear',
      addedDate: '2024-01-10',
      available: true,
      rating: 4.6,
      reviews: 15
    },
    {
      id: 3,
      name: 'Retro Band T-Shirt',
      price: 150000,
      originalPrice: 300000,
      image: '/src/assets/1000021576.jpg',
      seller: 'RetroClothing',
      condition: 'Very Good',
      category: 'Tops',
      addedDate: '2024-01-08',
      available: false,
      rating: 4.9,
      reviews: 31
    },
    {
      id: 4,
      name: 'Designer Handbag',
      price: 890000,
      originalPrice: 1500000,
      image: '/src/assets/abbey road (1969).jpg',
      seller: 'LuxuryThrift',
      condition: 'Excellent',
      category: 'Accessories',
      addedDate: '2024-01-05',
      available: true,
      rating: 4.7,
      reviews: 18
    },
    {
      id: 5,
      name: 'Vintage Sunglasses',
      price: 280000,
      originalPrice: 450000,
      image: '/src/assets/1000021576.jpg',
      seller: 'ClassicStyle',
      condition: 'Good',
      category: 'Accessories',
      addedDate: '2024-01-03',
      available: true,
      rating: 4.5,
      reviews: 12
    },
    {
      id: 6,
      name: 'Wool Sweater',
      price: 190000,
      originalPrice: 380000,
      image: '/src/assets/abbey road (1969).jpg',
      seller: 'WarmClothing',
      condition: 'Very Good',
      category: 'Tops',
      addedDate: '2024-01-01',
      available: true,
      rating: 4.4,
      reviews: 9
    }
  ]);

  const categories = ['all', 'Outerwear', 'Footwear', 'Tops', 'Accessories'];
  const sortOptions = [
    { value: 'recent', label: 'Recently Added' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'name', label: 'Name A-Z' }
  ];

  const removeFromWishlist = (id: number) => {
    setWishlistItems(prev => prev.filter(item => item.id !== id));
  };

  const filteredAndSortedItems = () => {
    let items = wishlistItems();
    
    // Filter by category
    if (filterCategory() !== 'all') {
      items = items.filter(item => item.category === filterCategory());
    }
    
    // Sort items
    switch (sortBy()) {
      case 'price-low':
        items.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        items.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        items.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'recent':
      default:
        items.sort((a, b) => new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime());
        break;
    }
    
    return items;
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const calculateDiscount = (original: number, current: number) => {
    return Math.round(((original - current) / original) * 100);
  };

  return (
    <div class="min-h-screen bg-gray-50">
      <Navbar />
      
      <div class="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center space-x-3">
              <A href="/settings" class="text-gray-600 hover:text-gray-900 transition-colors">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M15 19l-7-7 7-7" />
                </svg>
              </A>
              <h1 class="text-3xl font-bold text-gray-900">My Wishlist</h1>
            </div>
            <div class="flex items-center space-x-4">
              {/* View Mode Toggle */}
              <div class="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  class={`p-2 rounded-md transition-colors ${
                    viewMode() === 'grid' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  class={`p-2 rounded-md transition-colors ${
                    viewMode() === 'list' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div class="bg-blue-50 rounded-lg p-4">
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <div>
                  <p class="text-sm text-blue-600 font-medium">Total Items</p>
                  <p class="text-xl font-bold text-blue-900">{wishlistItems().length}</p>
                </div>
              </div>
            </div>
            <div class="bg-green-50 rounded-lg p-4">
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p class="text-sm text-green-600 font-medium">Available</p>
                  <p class="text-xl font-bold text-green-900">{wishlistItems().filter(item => item.available).length}</p>
                </div>
              </div>
            </div>
            <div class="bg-red-50 rounded-lg p-4">
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <div>
                  <p class="text-sm text-red-600 font-medium">Sold Out</p>
                  <p class="text-xl font-bold text-red-900">{wishlistItems().filter(item => !item.available).length}</p>
                </div>
              </div>
            </div>
            <div class="bg-purple-50 rounded-lg p-4">
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p class="text-sm text-purple-600 font-medium">Total Value</p>
                  <p class="text-xl font-bold text-purple-900">{formatPrice(wishlistItems().reduce((sum, item) => sum + item.price, 0))}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div class="flex flex-wrap items-center gap-4">
            {/* Category Filter */}
            <div class="flex items-center space-x-2">
              <label class="text-sm font-medium text-gray-700">Category:</label>
              <select
                value={filterCategory()}
                onChange={(e) => setFilterCategory(e.currentTarget.value)}
                class="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:ring-red-500 focus:border-red-500"
              >
                <For each={categories}>
                  {(category) => (
                    <option value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  )}
                </For>
              </select>
            </div>

            {/* Sort Filter */}
            <div class="flex items-center space-x-2">
              <label class="text-sm font-medium text-gray-700">Sort by:</label>
              <select
                value={sortBy()}
                onChange={(e) => setSortBy(e.currentTarget.value)}
                class="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:ring-red-500 focus:border-red-500"
              >
                <For each={sortOptions}>
                  {(option) => (
                    <option value={option.value}>{option.label}</option>
                  )}
                </For>
              </select>
            </div>
          </div>
        </div>

        {/* Wishlist Items */}
        <div class={`grid gap-6 ${
          viewMode() === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
            : 'grid-cols-1'
        }`}>
          <For each={filteredAndSortedItems()}>
            {(item) => (
              <div class={`bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow ${
                !item.available ? 'opacity-75' : ''
              } ${viewMode() === 'list' ? 'flex' : ''}`}>
                {/* Product Image */}
                <div class={`relative ${viewMode() === 'list' ? 'w-48 h-32' : 'w-full h-64'}`}>
                  <img
                    src={item.image}
                    alt={item.name}
                    class="w-full h-full object-cover"
                  />
                  {!item.available && (
                    <div class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <span class="text-white font-semibold text-lg">SOLD OUT</span>
                    </div>
                  )}
                  <div class="absolute top-3 left-3">
                    <span class="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                      -{calculateDiscount(item.originalPrice, item.price)}%
                    </span>
                  </div>
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    class="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors"
                  >
                    <svg class="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  </button>
                </div>

                {/* Product Info */}
                <div class="p-4 flex-1">
                  <div class="flex justify-between items-start mb-2">
                    <h3 class="font-semibold text-gray-900 text-lg leading-tight">{item.name}</h3>
                  </div>
                  
                  <div class="flex items-center space-x-2 mb-2">
                    <span class="text-sm text-gray-600">by</span>
                    <span class="text-sm font-medium text-blue-600">{item.seller}</span>
                    <span class="text-xs text-gray-400">•</span>
                    <span class="text-xs text-gray-500">{item.condition}</span>
                  </div>

                  <div class="flex items-center space-x-1 mb-3">
                    <div class="flex items-center">
                      {Array.from({ length: 5 }, (_, i) => (
                        <svg 
                          class={`w-4 h-4 ${i < Math.floor(item.rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                          fill="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      ))}
                    </div>
                    <span class="text-sm text-gray-600">({item.reviews})</span>
                  </div>

                  <div class="flex items-center justify-between mb-3">
                    <div class="flex flex-col">
                      <span class="text-xl font-bold text-gray-900">{formatPrice(item.price)}</span>
                      <span class="text-sm text-gray-500 line-through">{formatPrice(item.originalPrice)}</span>
                    </div>
                    <span class="text-xs text-gray-500">Added: {formatDate(item.addedDate)}</span>
                  </div>

                  <div class="flex space-x-2">
                    <A 
                      href={`/product/${item.id}`}
                      class={`flex-1 text-center py-2 px-4 rounded-lg font-medium transition-colors ${
                        item.available 
                          ? 'bg-gray-800 text-white hover:bg-gray-900' 
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {item.available ? 'View Product' : 'Sold Out'}
                    </A>
                  </div>
                </div>
              </div>
            )}
          </For>
        </div>

        {/* Empty State */}
        {wishlistItems().length === 0 && (
          <div class="bg-white rounded-lg shadow-sm p-12 text-center">
            <div class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Your wishlist is empty</h3>
            <p class="text-gray-600 mb-6">Start adding products you love to keep track of them!</p>
            <A 
              href="/products"
              class="bg-gray-800 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-900 transition-colors"
            >
              Browse Products
            </A>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Wishlist;
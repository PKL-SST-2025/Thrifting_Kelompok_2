import { For, Show, createEffect, createMemo, createSignal, onMount } from 'solid-js';
import { A } from '@solidjs/router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AuthModal from '../components/AuthModal';
import { getWishlist, removeFromWishlist, isAuthenticated, type Product } from '../lib/api';

type WishlistItem = {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  seller: string;
  condition: string;
  category: string;
  addedDate: string;
  available: boolean;
};

const CATEGORIES = [
  'Semua',
  'Vintage',
  'Outerwear',
  'Denim',
  'Atasan',
  'Bawahan',
  'Knitwear',
  'Sport Retro',
  'Workwear',
  'Aksesoris',
  'Tas',
  'Sepatu',
];

const Wishlist = () => {
  // Local state
  const [selectedCategory, setSelectedCategory] = createSignal<string>('Semua');
  const [sortBy, setSortBy] = createSignal<'Terbaru' | 'Termurah' | 'Termahal' | 'Nama'>('Terbaru');
  const [loading, setLoading] = createSignal(true);
  const [apiWishlist, setApiWishlist] = createSignal<Product[]>([]);
  const [showLoginModal, setShowLoginModal] = createSignal(false);

  // Load wishlist from API
  onMount(async () => {
    if (isAuthenticated()) {
      try {
        const wishlistData = await getWishlist();
        setApiWishlist(wishlistData);
      } catch (err) {
        console.error("Failed to load wishlist:", err);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
      setShowLoginModal(true);
    }
  });

  // Jika user logout di tengah-tengah
  createEffect(() => {
    if (!isAuthenticated()) {
      setShowLoginModal(true);
    }
  });

  const handleRemoveFromWishlist = async (id: number) => {
    if (isAuthenticated()) {
      try {
        await removeFromWishlist(id);
        setApiWishlist((prev) => prev.filter((p) => p.id !== id));
      } catch (err) {
        console.error("Failed to remove from wishlist:", err);
      }
    } else {
      setShowLoginModal(true);
    }
  };

  // Sample fallback data (mapped to Indonesian categories)
  const [wishlistItems, setWishlistItems] = createSignal<WishlistItem[]>([
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
    },
    {
      id: 2,
      name: 'Classic Leather Boots',
      price: 320000,
      originalPrice: 650000,
      image: '/src/assets/abbey road (1969).jpg',
      seller: 'VintageHub',
      condition: 'Good',
      category: 'Sepatu',
      addedDate: '2024-01-10',
      available: true,
    },
    {
      id: 3,
      name: 'Retro Band T-Shirt',
      price: 150000,
      originalPrice: 300000,
      image: '/src/assets/1000021576.jpg',
      seller: 'RetroClothing',
      condition: 'Very Good',
      category: 'Atasan',
      addedDate: '2024-01-08',
      available: false,
    },
    {
      id: 4,
      name: 'Designer Handbag',
      price: 890000,
      originalPrice: 1500000,
      image: '/src/assets/abbey road (1969).jpg',
      seller: 'LuxuryThrift',
      condition: 'Excellent',
      category: 'Tas',
      addedDate: '2024-01-05',
      available: true,
    },
    {
      id: 5,
      name: 'Vintage Sunglasses',
      price: 280000,
      originalPrice: 450000,
      image: '/src/assets/1000021576.jpg',
      seller: 'ClassicStyle',
      condition: 'Good',
      category: 'Aksesoris',
      addedDate: '2024-01-03',
      available: true,
    },
    {
      id: 6,
      name: 'Wool Sweater',
      price: 190000,
      originalPrice: 380000,
      image: '/src/assets/abbey road (1969).jpg',
      seller: 'WarmClothing',
      condition: 'Very Good',
      category: 'Knitwear',
      addedDate: '2024-01-01',
      available: true,
    },
  ]);

  // Derived values
  const countsByCategory = createMemo(() => {
    const map = new Map<string, number>();
    for (const c of CATEGORIES) map.set(c, 0);
    for (const it of wishlistItems()) {
      const c = it.category;
      map.set(c, (map.get(c) || 0) + 1);
    }
    map.set('Semua', wishlistItems().length);
    return map;
  });

  // Convert API products to wishlist items format
  const convertToWishlistItems = (products: Product[]): WishlistItem[] => {
    return products.map(p => ({
      id: p.id,
      name: p.name,
      price: p.price,
      originalPrice: Math.round(p.price * 1.2), // Assume 20% discount
      image: p.images?.[0] || '/src/assets/1000021576.jpg',
      seller: `Seller-${p.seller_id}`,
      condition: p.condition,
      category: p.category,
      addedDate: p.created_at,
      available: true
    }));
  };

  const filteredItems = createMemo(() => {
    // Use API data if authenticated, otherwise use sample data
    const items = isAuthenticated() && apiWishlist().length > 0 
      ? convertToWishlistItems(apiWishlist())
      : wishlistItems();
    
    let list = items.slice();
    if (selectedCategory() !== 'Semua') {
      list = list.filter((it) => it.category === selectedCategory());
    }

    switch (sortBy()) {
      case 'Termurah':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'Termahal':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'Nama':
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'Terbaru':
      default:
        list.sort(
          (a, b) => new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime()
        );
        break;
    }
    return list;
  });

  const formatPrice = (v: number) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(v);

  const calculateDiscount = (original: number, current: number) =>
    Math.max(0, Math.round(((original - current) / original) * 100));

  return (
    <div class="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      <Show when={showLoginModal()}>
        <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div class="bg-white rounded-xl shadow-lg p-8 max-w-xs w-full text-center">
            <h2 class="text-lg font-bold mb-2">Anda belum login</h2>
            <p class="mb-4 text-gray-600">Login sekarang untuk menggunakan fitur wishlist.</p>
            <button
              class="w-full py-2 rounded-md bg-black text-white font-semibold hover:bg-gray-800 transition mb-2"
              onClick={() => setShowLoginModal(false)}
            >
              Nanti Saja
            </button>
            <button
              class="w-full py-2 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
              onClick={() => {
                setShowLoginModal(false);
                // Tampilkan AuthModal login
                window.dispatchEvent(new CustomEvent('openAuthModal', { detail: { tab: 'signin' } }));
              }}
            >
              Login Sekarang
            </button>
          </div>
        </div>
      </Show>

      {/* Content */}
      <section class="py-8 sm:py-10 lg:py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Title + actions */}
          <div class="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div class="flex items-center gap-3">
              <span class="inline-block w-1.5 h-6 bg-gray-900 rounded-full" />
              <div>
                <h1 class="text-2xl sm:text-3xl font-bold text-gray-900">Wishlist</h1>
                <p class="text-xs text-gray-600">Simpan produk favoritmu dan kembali kapan saja</p>
              </div>
            </div>
            <div class="flex items-center gap-3 mt-2 sm:mt-0">
              <select
                value={sortBy()}
                onInput={(e) => setSortBy(e.currentTarget.value as any)}
                class="bg-gray-50 border border-gray-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
                title="Urutkan"
              >
                <option value="Terbaru">Urutkan: Terbaru</option>
                <option value="Termurah">Harga: Terendah</option>
                <option value="Termahal">Harga: Tertinggi</option>
                <option value="Nama">Nama A-Z</option>
              </select>
            </div>
          </div>

          {/* Mobile categories (chips) */}
          <div class="md:hidden -mx-4 px-4 overflow-x-auto pb-3 mb-4">
            <div class="flex items-center gap-2 min-w-max">
              <For each={CATEGORIES}>
                {(cat) => (
                  <button
                    class={`shrink-0 whitespace-nowrap px-4 py-2 rounded-full text-sm border transition-colors ${
                      selectedCategory() === cat
                        ? 'bg-gray-900 text-white border-gray-900'
                        : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                    }`}
                    aria-pressed={selectedCategory() === cat}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </button>
                )}
              </For>
            </div>
          </div>

          {/* Layout: sidebar left, products right */}
          <div class="grid grid-cols-12 gap-6">
            {/* Sidebar (left) */}
            <aside class="col-span-12 md:col-span-3">
              <div class="bg-white rounded-2xl border border-gray-200 shadow-sm md:sticky md:top-20 lg:top-24">
                <div class="px-4 py-3 border-b border-gray-100">
                  <h2 class="text-sm font-semibold text-gray-700">Kategori</h2>
                </div>
                <nav class="p-2">
                  <ul class="space-y-1">
                    <For each={CATEGORIES}>
                      {(cat) => (
                        <li>
                          <button
                            class={`w-full flex items-center justify-between rounded-lg px-3 py-2 text-sm border transition-colors ${
                              selectedCategory() === cat
                                ? 'bg-gray-900 text-white border-gray-900'
                                : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                            }`}
                            aria-pressed={selectedCategory() === cat}
                            onClick={() => setSelectedCategory(cat)}
                          >
                            <span class="truncate">{cat}</span>
                            <span
                              class={`ml-3 inline-flex min-w-[2rem] justify-center rounded-full px-2 py-0.5 text-xs font-medium ${
                                selectedCategory() === cat
                                  ? 'bg-white/10 text-white'
                                  : 'bg-gray-100 text-gray-700'
                              }`}
                            >
                              {countsByCategory().get(cat) ?? 0}
                            </span>
                          </button>
                        </li>
                      )}
                    </For>
                  </ul>
                </nav>
              </div>
            </aside>

            {/* Products (right) */}
            <main class="col-span-12 md:col-span-9">
              {/* Loading state */}
            {loading() && (
              <div class="text-center py-12">
                <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                <p class="mt-2 text-gray-600">Loading wishlist...</p>
              </div>
            )}

            {/* Results header */}
            {!loading() && (
              <div class="text-sm text-gray-600 mb-3">
                {isAuthenticated() ? 
                  `Hasil: ${filteredItems().length} item dari wishlist Anda` :
                  `Hasil: ${filteredItems().length} item (demo data)`
                }
              </div>
            )}

              {/* Grid */}
              <div class="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                <For each={filteredItems()}>
                  {(item) => (
                    <div class="group bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-all relative hover:-translate-y-0.5">
                      {/* Image */}
                      <div class="relative bg-gray-100 aspect-[3/4] overflow-hidden">
                        <img src={item.image} alt={item.name} class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]" />

                        {/* Discount */}
                        {item.originalPrice > item.price && (
                          <div class="absolute top-2 left-2">
                            <span class="inline-flex items-center rounded-full bg-gray-900 text-white px-2 py-1 text-[11px] font-semibold">
                              -{calculateDiscount(item.originalPrice, item.price)}%
                            </span>
                          </div>
                        )}

                        {/* Remove */}
                        <button
                          title="Hapus dari wishlist"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleRemoveFromWishlist(item.id);
                          }}
                          class="absolute top-2 right-2 p-2 bg-white/90 rounded-full shadow hover:bg-gray-50"
                        >
                          <svg class="w-5 h-5 text-rose-500" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                          </svg>
                        </button>

                        {/* Sold out overlay */}
                        {!item.available && (
                          <div class="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <span class="text-white text-xs font-semibold tracking-wide">SOLD OUT</span>
                          </div>
                        )}
                      </div>

                      {/* Info */}
                      <div class="p-3">
                        <p class="text-[11px] text-gray-500 uppercase tracking-wide">{item.category}</p>
                        <h3 class="text-sm text-gray-900 leading-snug line-clamp-2">{item.name}</h3>
                        <div class="mt-1 text-[12px] text-gray-600 flex items-center gap-2">
                          <span>by {item.seller}</span>
                          <span class="inline-flex items-center rounded-full bg-gray-100 text-gray-700 px-2 py-0.5 text-[10px] font-medium">{item.condition}</span>
                        </div>
                        <div class="mt-2 flex items-center gap-2">
                          <div class="font-semibold text-gray-900">{formatPrice(item.price)}</div>
                          <div class="text-xs text-gray-400 line-through">{formatPrice(item.originalPrice)}</div>
                          <span class={`ml-auto inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium ${item.available ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-200 text-gray-700'}`}>
                            {item.available ? 'Tersedia' : 'Habis'}
                          </span>
                        </div>
                        <div class="mt-2">
                          <A href={`/product/${item.id}`} class="inline-flex items-center text-xs text-gray-700 hover:text-gray-900 underline">Lihat produk</A>
                        </div>
                      </div>
                    </div>
                  )}
                </For>
              </div>

              {/* Empty state (when filtered) */}
              {filteredItems().length === 0 && (
                <div class="bg-white rounded-xl border border-gray-200 p-8 text-center text-gray-600">Tidak ada item pada kategori ini.</div>
              )}
            </main>
          </div>

          {/* Empty state (when all removed) */}
          {wishlistItems().length === 0 && (
            <div class="mt-10 bg-white rounded-2xl border border-gray-200 p-10 text-center">
              <h3 class="text-lg font-semibold text-gray-900 mb-2">Wishlist kosong</h3>
              <p class="text-gray-600 mb-4">Jelajahi produk dan tambahkan favoritmu ke wishlist.</p>
              <A href="/products" class="inline-flex items-center px-4 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-50 text-sm">Lihat semua produk</A>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Wishlist;
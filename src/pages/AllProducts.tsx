import { Component, createEffect, createSignal, onMount } from "solid-js";
import { A, useParams, useNavigate } from "@solidjs/router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getProducts, addToWishlist, removeFromWishlist, isAuthenticated, type Product } from "../lib/api";

const AllProducts: Component = () => {
  // Router params
  const params = useParams();
  const navigate = useNavigate();

  // Toolbar state (Indonesian labels)
  const [sortBy, setSortBy] = createSignal("Terbaru");
  const [availability, setAvailability] = createSignal("Semua");
  const [selectedGender, setSelectedGender] = createSignal("Semua");
  const [selectedCategory, setSelectedCategory] = createSignal("Semua");
  const [selectedSize, setSelectedSize] = createSignal("Semua");
  const [selectedColor, setSelectedColor] = createSignal("Semua");

  // Suggested categories suitable for a thrift/vintage shop
  const categories = [
    "Semua",
    "Vintage",
    "Outerwear",
    "Denim",
    "Atasan",
    "Bawahan",
    "Knitwear",
    "Sport Retro",
    "Workwear",
    "Aksesoris",
    "Tas",
    "Sepatu",
  ];

  // Sizes and colors options
  const sizes = ["Semua", "XS", "S", "M", "L", "XL"];
  const colors = [
  { name: "Semua", code: "transparent", ring: "" },
    { name: "Black", code: "#111827", ring: "ring-white/40" },
    { name: "White", code: "#ffffff", ring: "ring-gray-300" },
    { name: "Navy", code: "#1f2a44", ring: "ring-white/40" },
    { name: "Beige", code: "#d9c7a1", ring: "ring-white/40" },
    { name: "Brown", code: "#8b5e3c", ring: "ring-white/40" },
    { name: "Green", code: "#2f855a", ring: "ring-white/40" },
    { name: "Blue", code: "#2563eb", ring: "ring-white/40" },
    { name: "Gray", code: "#6b7280", ring: "ring-white/40" },
  ];

  // Products from API
  const [products, setProducts] = createSignal<Product[]>([]);
  const [loading, setLoading] = createSignal(true);

  // Load products on mount
  onMount(async () => {
    try {
      const fetchedProducts = await getProducts();
      setProducts(fetchedProducts);

      // Load wishlist if authenticated
      if (isAuthenticated()) {
        try {
          const { getWishlist } = await import('../lib/api');
          const wishlistItems = await getWishlist();
          const likedIds = new Set(wishlistItems.map(item => item.id));
          setLikedProducts(likedIds);
        } catch (err) {
          console.error("Failed to load wishlist:", err);
        }
      }
    } catch (err) {
      console.error("Failed to load products:", err);
    } finally {
      setLoading(false);
    }
  });

  // Sample fallback data (keeping some for demo)
  const sampleProducts = [
    {
      id: 1,
      name: "Zip-Up Short Jacket",
      description: "Stylish vintage jacket",
      price: 69900,
      category: "Outerwear",
      condition: "Excellent",
      seller_id: "1",
      images: [],
      created_at: "2024-01-01",
    },
    {
      id: 2,
      name: "Milano Ribbed Knitted Jacket",
      brand: "Thrifting",
      price: 49900,
      category: "Knitwear",
      gender: "Wanita",
      colors: ["Brown", "Beige", "Black"],
      sizes: ["S", "M", "L", "XL"],
      inStockOnline: true,
    },
    {
      id: 3,
      name: "AIRism Soft Jacket",
      brand: "Thrifting",
      price: 39900,
      category: "Sport Retro",
      gender: "Wanita",
      colors: ["Navy", "Black", "Gray"],
      sizes: ["XS", "S", "M", "L", "XL"],
      inStockOnline: true,
    },
    {
      id: 4,
      name: "Coated Short Jacket (Faux Leather)",
      brand: "Thrifting",
      price: 89900,
      category: "Outerwear",
      gender: "Wanita",
      colors: ["Black"],
      sizes: ["XS", "S", "M", "L"],
      inStockOnline: false,
    },
    {
      id: 5,
      name: "Vintage Denim Jacket",
      brand: "Thrifting",
      price: 75900,
      category: "Denim",
      gender: "Pria",
      colors: ["Blue", "Black"],
      sizes: ["S", "M", "L", "XL"],
      inStockOnline: true,
    },
    {
      id: 6,
      name: "Workwear Chore Coat",
      brand: "Thrifting",
      price: 82900,
      category: "Workwear",
      gender: "Pria",
      colors: ["Navy", "Brown"],
      sizes: ["S", "M", "L"],
      inStockOnline: true,
    },
    {
      id: 7,
      name: "Vintage Band Tee",
      brand: "Thrifting",
      price: 24900,
      category: "Vintage",
      gender: "Unisex",
      colors: ["Black", "White"],
      sizes: ["S", "M", "L", "XL"],
      inStockOnline: true,
    },
    {
      id: 8,
      name: "Knit Cardigan",
      brand: "Thrifting",
      price: 45900,
      category: "Knitwear",
      gender: "Wanita",
      colors: ["Beige", "Green", "Gray"],
      sizes: ["XS", "S", "M"],
      inStockOnline: false,
    },
    {
      id: 9,
      name: "Retro Track Jacket",
      brand: "Thrifting",
      price: 38900,
      category: "Sport Retro",
      gender: "Pria",
      colors: ["Blue", "Gray", "Black"],
      sizes: ["M", "L", "XL"],
      inStockOnline: true,
    },
    {
      id: 10,
      name: "High-Rise Denim Pants",
      brand: "Thrifting",
      price: 32900,
      category: "Bawahan",
      gender: "Wanita",
      colors: ["Blue", "Black"],
      sizes: ["S", "M", "L"],
      inStockOnline: true,
    },
    {
      id: 11,
      name: "Leather Crossbody Bag",
      brand: "Thrifting",
      price: 29900,
      category: "Tas",
      gender: "Unisex",
      colors: ["Black", "Brown"],
      sizes: ["S"],
      inStockOnline: true,
    },
    {
      id: 12,
      name: "Classic Oxford Shirt",
      brand: "Thrifting",
      price: 27900,
      category: "Atasan",
      gender: "Pria",
      colors: ["White", "Blue"],
      sizes: ["S", "M", "L", "XL"],
      inStockOnline: true,
    },
  ];

  const [likedProducts, setLikedProducts] = createSignal<Set<number>>(new Set());

  const toggleLike = async (productId: number) => {
    if (!isAuthenticated()) {
      // Show login modal if not authenticated
      // For now, just show alert
      alert("Please login to add items to wishlist");
      return;
    }

    try {
      if (likedProducts().has(productId)) {
        await removeFromWishlist(productId);
        setLikedProducts(prev => {
          const newSet = new Set(prev);
          newSet.delete(productId);
          return newSet;
        });
      } else {
        await addToWishlist(productId);
        setLikedProducts(prev => new Set(prev).add(productId));
      }
    } catch (err) {
      console.error("Failed to toggle wishlist:", err);
      alert("Failed to update wishlist. Please try again.");
    }
  };

  // Filtering and sorting helpers
  const filteredProducts = () => {
    const allProducts = products().length > 0 ? products() : sampleProducts;
    let list = allProducts.filter((p) =>
      (selectedCategory() === "Semua" || p.category === selectedCategory())
    );

    list = list.sort((a, b) => {
      switch (sortBy()) {
        case "Termurah":
          return a.price - b.price;
        case "Termahal":
          return b.price - a.price;
        case "Populer":
          return a.id - b.id; // placeholder popularity
        case "Terbaru":
        default:
          return b.id - a.id;
      }
    });
    return list;
  };

  const formatPrice = (v: number) => `Rp ${v.toLocaleString("id-ID")}`;

  const pageTitle = () => (selectedCategory() === 'Semua' ? 'Semua Produk' : selectedCategory());

  // Map slug to category and reverse
  const slugToCategory = (slug?: string) => {
    if (!slug) return "Semua";
    const decoded = decodeURIComponent(slug).toLowerCase();
    const map: Record<string, string> = {
      semua: "Semua",
      vintage: "Vintage",
      outerwear: "Outerwear",
      denim: "Denim",
      atasan: "Atasan",
      bawahan: "Bawahan",
      knitwear: "Knitwear",
      "sport-retro": "Sport Retro",
      workwear: "Workwear",
      aksesoris: "Aksesoris",
      tas: "Tas",
      sepatu: "Sepatu",
    };
    return map[decoded] || "Semua";
  };

  const categoryToSlug = (cat: string) => {
    return cat
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
  };

  // Sync category with route slug
  createEffect(() => {
    const cat = slugToCategory(params.slug);
    setSelectedCategory(cat);
  });

  return (
    <div class="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      
      {/* No hero. Directly into content */}

      {loading() && (
        <div class="flex justify-center items-center py-20">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
      )}

      {/* Products Section */}
      <section class="py-12 sm:py-16 lg:py-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Toolbar: category tabs + filters + sort */}
          <div class="bg-white rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100 mb-6">
            <div class="flex flex-col gap-4">
              {/* Pills categories */}
              <div class="flex items-center gap-3 sm:flex-wrap overflow-x-auto sm:overflow-visible pb-1 -mx-2 px-2 scroll-px-2 snap-x">
                {categories.map((c) => (
                  <button
                    class={`shrink-0 whitespace-nowrap px-4 py-2 rounded-full text-sm border transition-colors snap-start ${selectedCategory() === c ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'}`}
                    onClick={() => {
                      setSelectedCategory(c);
                      const slug = categoryToSlug(c);
                      if (slug === 'semua') navigate('/products');
                      else navigate(`/products/category/${slug}`);
                    }}
                  >
                    {c}
                  </button>
                ))}
              </div>

              {/* Filter row */}
              <div class="flex flex-wrap items-center gap-3 justify-between">
                <div class="flex flex-wrap items-center gap-3">
                  <select
                    value={availability()}
                    onInput={(e) => setAvailability(e.currentTarget.value)}
                    class="bg-gray-50 border border-gray-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
                    title="Ketersediaan"
                  >
                    <option value="Semua">Ketersediaan: semua</option>
                    <option value="Online Saja">Stok: online saja</option>
                  </select>

                  <select
                    value={selectedGender()}
                    onInput={(e) => setSelectedGender(e.currentTarget.value)}
                    class="bg-gray-50 border border-gray-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
                    title="Gender"
                  >
                    <option value="Semua">Gender: semua</option>
                    <option value="Wanita">Wanita</option>
                    <option value="Pria">Pria</option>
                    <option value="Unisex">Unisex</option>
                  </select>

                  <select
                    value={selectedSize()}
                    onInput={(e) => setSelectedSize(e.currentTarget.value)}
                    class="bg-gray-50 border border-gray-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
                    title="Ukuran"
                  >
                    {sizes.map((s) => (
                      <option value={s}>{s === 'Semua' ? 'Ukuran: semua' : s}</option>
                    ))}
                  </select>

                  <select
                    value={selectedColor()}
                    onInput={(e) => setSelectedColor(e.currentTarget.value)}
                    class="bg-gray-50 border border-gray-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
                    title="Warna"
                  >
                    {colors.map((c) => (
                      <option value={c.name}>{c.name === 'Semua' ? 'Warna: semua' : c.name}</option>
                    ))}
                  </select>
                </div>

                {/* Sort on the right */}
                <div class="ml-auto">
                  <select
                    value={sortBy()}
                    onInput={(e) => setSortBy(e.currentTarget.value)}
                    class="bg-gray-50 border border-gray-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
                    title="Urutkan"
                  >
                    <option value="Terbaru">Urutkan: Terbaru</option>
                    <option value="Populer">Urutkan: Populer</option>
                    <option value="Termurah">Harga: Terendah</option>
                    <option value="Termahal">Harga: Tertinggi</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Title + Results */}
          <div class="flex items-baseline justify-between mb-4">
            <h1 class="text-2xl sm:text-3xl font-bold text-gray-900">{pageTitle()}</h1>
            <div class="text-sm text-gray-600">Hasil: {filteredProducts().length} produk</div>
          </div>

          {/* Products Grid (Uniqlo-like minimal cards) */}
          <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts().map((product) => (
              <div class="group">
                <A href={`/product/${product.id}`} class="block cursor-pointer">
                  {/* Product Card - minimal */}
                  <div class="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-md transition-all">
                    {/* Image region */}
                    <div class="relative bg-gray-100 aspect-[3/4] overflow-hidden">
                      {/* Placeholder block (replace with actual images when available) */}
                      <div class="absolute inset-0 flex items-center justify-center text-gray-500">
                        <span class="text-sm">Image</span>
                      </div>

                      {/* Wishlist */}
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          toggleLike(product.id);
                        }}
                        class="absolute top-2 right-2 p-2 bg-white/90 rounded-full shadow hover:bg-gray-50"
                      >
                        <svg
                          class={`w-5 h-5 ${likedProducts().has(product.id) ? 'text-purple-600 fill-current' : 'text-gray-400'}`}
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          stroke-width="2"
                        >
                          <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </button>
                    </div>

                    {/* Swatches */}
                    <div class="flex items-center gap-2 px-3 pt-3">
                      {(product as any).colors ? (product as any).colors.slice(0, 5).map((c) => {
                        const meta = colors.find((x) => x.name === c);
                        return (
                          <span
                            title={c}
                            class={`inline-block w-4 h-4 rounded-full ring-1 ${meta?.ring || 'ring-white/40'}`}
                            style={{ background: meta?.code || '#ccc' }}
                          />
                        );
                      }) : null}
                      {(product as any).colors && (product as any).colors.length > 5 && (
                        <span class="text-xs text-gray-500">+{(product as any).colors.length - 5}</span>
                      )}
                    </div>

                    {/* Info */}
                    <div class="p-3">
                      <p class="text-[11px] text-gray-500 uppercase tracking-wide">{(product as any).gender || product.category}</p>
                      <h3 class="text-sm text-gray-900 leading-snug line-clamp-2">{product.name}</h3>
                      <div class="mt-1 text-gray-700 text-sm">{(product as any).sizes ? sizes.filter(s => s !== 'All' && (product as any).sizes.includes(s)).join(' · ') : 'Berbagai Ukuran'}</div>
                      <div class="mt-2 font-semibold text-gray-900">{formatPrice(product.price)}</div>
                    </div>
                  </div>
                </A>
              </div>
            ))}
          </div>

          {/* Load more */}
          <div class="text-center mt-12">
            <button class="px-6 py-3 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-50">Load more</button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AllProducts;
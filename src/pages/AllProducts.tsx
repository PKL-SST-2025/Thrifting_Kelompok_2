import { Component, createSignal } from "solid-js";
import { A } from "@solidjs/router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AllProducts: Component = () => {
  const [sortBy, setSortBy] = createSignal("Cheapest");
  const [filter, setFilter] = createSignal("All");

  // Sample product data - sesuai dengan desain dari foto
  const products = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    name: "Polo T-shirt Women -ivory",
    brand: "Thrifting",
    price: "Rp 129.000,00",
    image: null, // placeholder untuk gambar
    liked: false
  }));

  const [likedProducts, setLikedProducts] = createSignal<Set<number>>(new Set());

  const toggleLike = (productId: number) => {
    const currentLiked = likedProducts();
    const newLiked = new Set(currentLiked);
    
    if (newLiked.has(productId)) {
      newLiked.delete(productId);
    } else {
      newLiked.add(productId);
    }
    
    setLikedProducts(newLiked);
  };

  return (
    <div class="min-h-screen bg-white">
      <Navbar />
      
      {/* Header Section */}
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h1 class="text-3xl sm:text-4xl font-bold">New Arrivals</h1>
          
          {/* Filter and Sort Controls */}
          <div class="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <div class="flex items-center gap-2">
              <label class="text-sm text-gray-600">Filter:</label>
              <select 
                value={filter()}
                onInput={(e) => setFilter(e.currentTarget.value)}
                class="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-black"
              >
                <option value="All">All</option>
                <option value="T-shirt">T-shirt</option>
                <option value="Dress">Dress</option>
                <option value="Accessories">Accessories</option>
              </select>
            </div>
            
            <div class="flex items-center gap-2">
              <label class="text-sm text-gray-600">Sort :</label>
              <select 
                value={sortBy()}
                onInput={(e) => setSortBy(e.currentTarget.value)}
                class="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-black"
              >
                <option value="Cheapest">Cheapest</option>
                <option value="Most Expensive">Most Expensive</option>
                <option value="Newest">Newest</option>
                <option value="Popular">Popular</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div class="group">
              <A href={`/product/${product.id}`} class="block cursor-pointer">
                {/* Product Image */}
                <div class="relative bg-gray-200 aspect-[3/4] rounded-lg overflow-hidden mb-4">
                  <div class="w-full h-full bg-gray-300 flex items-center justify-center">
                    <span class="text-gray-500">Product Image</span>
                  </div>
                  
                  {/* Like Button */}
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleLike(product.id);
                    }}
                    class="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all z-10"
                  >
                    <svg 
                      class={`w-5 h-5 ${likedProducts().has(product.id) ? 'text-red-500 fill-current' : 'text-gray-400'}`}
                      viewBox="0 0 24 24" 
                      stroke="currentColor" 
                      stroke-width="2"
                    >
                      <path 
                        stroke-linecap="round" 
                        stroke-linejoin="round" 
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                      />
                    </svg>
                  </button>

                  {/* Hover Overlay */}
                  <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                    <div class="bg-white text-black px-6 py-2 rounded-md opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 font-medium">
                      Quick View
                    </div>
                  </div>
                </div>

                {/* Product Info */}
                <div class="space-y-1">
                  <p class="text-sm text-gray-600">{product.brand}</p>
                  <h3 class="font-medium text-gray-900 line-clamp-2">{product.name}</h3>
                  <p class="font-semibold text-black">{product.price}</p>
                </div>
              </A>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div class="text-center mt-12">
          <button class="bg-black text-white px-8 py-3 rounded-md hover:bg-gray-800 transition-colors font-medium">
            Load More Products
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AllProducts;
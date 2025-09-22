import { Component } from "solid-js";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import slideshow from "../assets/abbey road (1969).jpg"

const Home: Component = () => {
  return (
    <div class="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section class="relative h-64 sm:h-80 md:h-96 lg:h-[500px] bg-gray-200 overflow-hidden">
        <img 
          src={slideshow}
          alt="Hero Image" 
          class="w-full h-full object-cover object-[25%_70%]"
        />
      </section>

      {/* New Arrivals Section */}
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <h2 class="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">New Arrivals</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8">
          <div class="bg-gray-200 aspect-square rounded-lg overflow-hidden group cursor-pointer product-card">
            <div class="w-full h-full bg-gray-300 flex items-center justify-center">
              <span class="text-gray-500">Product Image</span>
            </div>
          </div>
          <div class="bg-gray-200 aspect-square rounded-lg overflow-hidden group cursor-pointer product-card">
            <div class="w-full h-full bg-gray-300 flex items-center justify-center">
              <span class="text-gray-500">Product Image</span>
            </div>
          </div>
          <div class="bg-gray-200 aspect-square rounded-lg overflow-hidden group cursor-pointer product-card sm:col-span-2 lg:col-span-1">
            <div class="w-full h-full bg-gray-300 flex items-center justify-center">
              <span class="text-gray-500">Product Image</span>
            </div>
          </div>
        </div>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8">
          <div class="text-center">
            <p class="text-base sm:text-lg font-semibold">Rp 95.000,00</p>
            <p class="text-sm sm:text-base text-gray-600">Vintage</p>
          </div>
          <div class="text-center">
            <p class="text-base sm:text-lg font-semibold">Rp 85.000,00</p>
            <p class="text-sm sm:text-base text-gray-600">Vintage</p>
          </div>
          <div class="text-center sm:col-span-2 lg:col-span-1">
            <p class="text-base sm:text-lg font-semibold">Rp 95.000,00</p>
            <p class="text-sm sm:text-base text-gray-600">Vintage</p>
          </div>
        </div>

        <div class="text-center">
          <button class="bg-black text-white px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base rounded hover:bg-gray-800 transition-colors w-full sm:w-auto">
            VIEW ALL PRODUCTS
          </button>
        </div>
      </section>

      {/* Featured Collection Section */}
      <section class="bg-gray-50 py-8 sm:py-12 lg:py-16">
        <div class="w-full px-0">
          <div class="relative h-48 sm:h-64 md:h-80 lg:h-96 bg-gray-200 overflow-hidden mb-6 sm:mb-8">
            <img 
              src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
              alt="Collection Image" 
              class="w-full h-full object-cover"
            />
            <div class="absolute inset-0"></div>
          </div>
        </div>

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-8 sm:mb-12">
            <h2 class="text-xl sm:text-2xl font-bold mb-4">Koleksi Pilihan</h2>
            <div class="flex justify-center space-x-4">
              <span class="text-gray-600">→</span>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            <div class="bg-gray-200 aspect-square rounded-lg overflow-hidden">
              <div class="w-full h-full bg-gray-300 flex items-center justify-center">
                <span class="text-gray-500">Collection Image</span>
              </div>
            </div>
            <div class="bg-gray-200 aspect-square rounded-lg overflow-hidden">
              <div class="w-full h-full bg-gray-300 flex items-center justify-center">
                <span class="text-gray-500">Collection Image</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shop The Look Section */}
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 relative">
        <h2 class="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">SHOP THE LOOK</h2>
        
        {/* Navigation Buttons */}
        <button class="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white p-2 sm:p-3 rounded-full shadow-lg hover:shadow-xl transition-all z-10">
          <span class="text-black text-lg font-bold">‹</span>
        </button>
        <button class="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white p-2 sm:p-3 rounded-full shadow-lg hover:shadow-xl transition-all z-10">
          <span class="text-black text-lg font-bold">›</span>
        </button>

        <div class="flex items-center justify-center gap-4 sm:gap-6 lg:gap-8">
          {/* Left Product */}
          <div class="flex-shrink-0 w-24 sm:w-32 md:w-40">
            <div class="bg-gray-200 aspect-[3/4] rounded-lg overflow-hidden">
              <div class="w-full h-full bg-gray-300 flex items-center justify-center">
                <span class="text-gray-500 text-xs">Product</span>
              </div>
            </div>
            <div class="text-center mt-2">
              <p class="text-xs sm:text-sm font-semibold">Vintage Jacket</p>
              <p class="text-xs text-gray-600">Rp 125.000</p>
            </div>
          </div>

          {/* Center Product (Main) */}
          <div class="flex-shrink-0 w-48 sm:w-64 md:w-80 relative">
            <div class="bg-gray-200 aspect-[3/4] rounded-lg overflow-hidden relative">
              <div class="w-full h-full bg-gray-300 flex items-center justify-center">
                <span class="text-gray-500">Main Product</span>
              </div>
              
              {/* Product Info Overlay */}
              <div class="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 bg-white p-2 sm:p-3 rounded shadow-lg">
                <p class="text-xs sm:text-sm font-semibold">Uniqlo pants</p>
                <p class="text-xs text-gray-600 mb-2">Rp 150.000</p>
                <button class="bg-black text-white px-3 sm:px-4 py-1 sm:py-2 rounded text-xs sm:text-sm w-full hover:bg-gray-800 transition-colors">
                  View Product
                </button>
              </div>
              
              {/* Quick View Button */}
              <button class="absolute top-3 sm:top-4 right-3 sm:right-4 bg-white p-1.5 sm:p-2 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center">
                <svg class="w-4 h-4 sm:w-5 sm:h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Right Product */}
          <div class="flex-shrink-0 w-24 sm:w-32 md:w-40">
            <div class="bg-gray-200 aspect-[3/4] rounded-lg overflow-hidden">
              <div class="w-full h-full bg-gray-300 flex items-center justify-center">
                <span class="text-gray-500 text-xs">Product</span>
              </div>
            </div>
            <div class="text-center mt-2">
              <p class="text-xs sm:text-sm font-semibold">Retro Sneakers</p>
              <p class="text-xs text-gray-600">Rp 200.000</p>
            </div>
          </div>
        </div>

        {/* Dots Indicator */}
        <div class="flex justify-center mt-6 space-x-2">
          <div class="w-2 h-2 bg-black rounded-full"></div>
          <div class="w-2 h-2 bg-gray-300 rounded-full"></div>
          <div class="w-2 h-2 bg-gray-300 rounded-full"></div>
        </div>
      </section>

      {/* Trust Section */}
      <section class="bg-gray-50 py-8 sm:py-12 lg:py-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 class="text-2xl sm:text-3xl font-bold text-center mb-3 sm:mb-4">Aman dan Terlindungi!</h2>
          <p class="text-center text-gray-600 mb-8 sm:mb-12 max-w-2xl mx-auto text-sm sm:text-base px-4">
            Kami bekerja sama dengan brand terverifikasi sebelumnya dengan seleksi dan kawalnya yang begitu ketat 
            dari berbagai macam gebrakan produk atau bahan hingga proses mengemasan
          </p>
          
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4 lg:gap-6">
            {/* Trust Cards */}
            <div class="bg-white p-3 sm:p-4 lg:p-6 rounded-lg shadow-sm text-center">
              <div class="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gray-200 rounded-full mx-auto mb-2 sm:mb-3 lg:mb-4 flex items-center justify-center">
                <span class="text-gray-500 text-xs sm:text-sm">J</span>
              </div>
              <p class="text-xs sm:text-sm font-medium">Jarwo</p>
            </div>
            <div class="bg-white p-3 sm:p-4 lg:p-6 rounded-lg shadow-sm text-center">
              <div class="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gray-200 rounded-full mx-auto mb-2 sm:mb-3 lg:mb-4 flex items-center justify-center">
                <span class="text-gray-500 text-xs sm:text-sm">J</span>
              </div>
              <p class="text-xs sm:text-sm font-medium">Jarwo</p>
            </div>
            <div class="bg-white p-3 sm:p-4 lg:p-6 rounded-lg shadow-sm text-center">
              <div class="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gray-200 rounded-full mx-auto mb-2 sm:mb-3 lg:mb-4 flex items-center justify-center">
                <span class="text-gray-500 text-xs sm:text-sm">J</span>
              </div>
              <p class="text-xs sm:text-sm font-medium">Jarwo</p>
            </div>
            <div class="bg-white p-3 sm:p-4 lg:p-6 rounded-lg shadow-sm text-center">
              <div class="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gray-200 rounded-full mx-auto mb-2 sm:mb-3 lg:mb-4 flex items-center justify-center">
                <span class="text-gray-500 text-xs sm:text-sm">J</span>
              </div>
              <p class="text-xs sm:text-sm font-medium">Jarwo</p>
            </div>
            <div class="bg-white p-3 sm:p-4 lg:p-6 rounded-lg shadow-sm text-center col-span-2 sm:col-span-1">
              <div class="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gray-200 rounded-full mx-auto mb-2 sm:mb-3 lg:mb-4 flex items-center justify-center">
                <span class="text-gray-500 text-xs sm:text-sm">J</span>
              </div>
              <p class="text-xs sm:text-sm font-medium">Jarwo</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
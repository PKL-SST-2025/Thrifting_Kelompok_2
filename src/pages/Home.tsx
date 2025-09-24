import { Component } from "solid-js";
import { A } from "@solidjs/router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import slideshow from "../assets/abbey road (1969).jpg"
import imgver from "../assets/1000021576.jpg"

const Home: Component = () => {
  return (
    <div class="min-h-screen bg-white">
      <Navbar />
      
  {/* Hero Section */}
  <section class="relative w-full h-[70vh] sm:h-[80vh] md:h-[85vh] lg:h-[90vh] min-h-[520px] overflow-hidden">
        <img 
          src={slideshow}
          alt="Hero Image" 
          class="absolute inset-0 w-full h-full object-cover"
          style="object-position: center 70%"
        />
        {/* Subtle readability overlays */}
        <div class="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
        <div class="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/10"></div>
        {/* Decorative Curve Separator (replaces bottom fade) */}
        <div class="absolute inset-x-0 bottom-0 pointer-events-none">
          <svg class="w-full h-14 sm:h-16 text-white" viewBox="0 0 1440 100" preserveAspectRatio="none" fill="currentColor">
            <path d="M0,64 C240,96 480,0 720,16 C960,32 1200,96 1440,64 L1440,100 L0,100 Z"/>
          </svg>
        </div>
        
        {/* Content Overlay */}
        <div class="relative z-10 h-full flex items-end pb-12 sm:pb-16 lg:pb-20">
          <div class="w-full pl-6 pr-6 sm:pl-8 sm:pr-8 lg:pl-12 lg:pr-12 max-w-none">
            <div class="max-w-3xl">
              <div class="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-4 sm:mb-6 border border-white/20">
                <svg class="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 3l1.8 3.6L18 8.4l-3.6 1.8L12 14l-1.8-3.8L6 8.4l4.2-1.8L12 3z"/>
                </svg>
                <span class="text-white text-sm font-medium">Premium Collection</span>
              </div>
              <h1 class="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 leading-[1.1] tracking-tight">
                Temukan Gaya
                <span class="block text-transparent bg-gradient-to-r from-purple-300 via-indigo-300 to-blue-300 bg-clip-text">
                  Unikmu
                </span>
              </h1>
              <p class="text-lg sm:text-xl md:text-2xl text-white/90 mb-6 sm:mb-8 leading-relaxed font-light max-w-2xl">
                Koleksi vintage & thrift terpilih untuk generasi yang peduli lingkungan dan gaya hidup berkelanjutan
              </p>
              
              {/* Stats */}
              <div class="flex flex-wrap gap-6 sm:gap-8 text-white/80 text-sm font-medium mb-8">
                <div class="flex items-center gap-2">
                  <div class="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span>1000+ Produk Berkualitas</span>
                </div>
                <div class="flex items-center gap-2">
                  <div class="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span>Sustainable Fashion</span>
                </div>
                <div class="flex items-center gap-2">
                  <div class="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span>Harga Terjangkau</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Mouse Scroll Indicator */}
        <a href="#new-arrivals" class="absolute inset-x-0 bottom-16 sm:bottom-20 flex flex-col items-center text-white/80 group">
          <div class="mouse-scroll float">
            <span class="wheel"></span>
          </div>
          <span class="mt-2 text-[11px] sm:text-xs font-medium tracking-wide group-hover:text-white">Scroll untuk melihat</span>
        </a>
      </section>

      {/* New Arrivals Section */}
  <section id="new-arrivals" class="bg-gradient-to-b from-white to-gray-50 py-16 sm:py-20 lg:py-24">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12 sm:mb-16">
            <div class="inline-flex items-center gap-2 bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M5 12a1 1 0 011-1h2l1-2 1 2h2a1 1 0 010 2h-2l-1 2-1-2H6a1 1 0 01-1-1z"/>
                <path d="M13 5l1.5 3L18 9l-3.5 1L13 13l-1.5-3L8 9l3.5-1L13 5z"/>
              </svg>
              Fresh Arrivals
            </div>
            <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">New Arrivals</h2>
            <p class="text-lg text-gray-600 max-w-2xl mx-auto">Temukan koleksi terbaru yang baru saja tiba minggu ini</p>
          </div>
          
          {/* Product Cards */}
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {[
            { name: "Vintage Jacket", price: "Rp 95.000", category: "Vintage" },
            { name: "Retro Sneakers", price: "Rp 85.000", category: "Vintage" },  
            { name: "Thrift Bag", price: "Rp 95.000", category: "Vintage" }
          ].map((product, index) => (
            <A href={`/product/${index + 1}`} class="group">
              <div class="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                {/* Product Image */}
                <div class="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                  <div class="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div class="h-full flex items-center justify-center">
                    <span class="text-gray-600 font-medium text-lg">{product.name}</span>
                  </div>
                  {/* Add to Wishlist Button */}
                  <button class="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-purple-50">
                    <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                    </svg>
                  </button>
                </div>
                
                {/* Product Info */}
                <div class="p-6">
                  <h3 class="text-xl font-semibold text-gray-900 mb-1">{product.name}</h3>
                  <p class="text-gray-600 text-sm mb-3">{product.category}</p>
                  <div class="flex items-center justify-between">
                    <span class="text-2xl font-bold text-gray-900">{product.price}</span>
                    <button class="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors transform hover:scale-105">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </A>
          ))}
        </div>

          <div class="text-center mt-12 space-y-8">
            <p class="text-gray-600 text-sm">Lebih dari 1000+ produk vintage berkualitas menanti Anda</p>
            <A href="/products">
              <button class="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white px-12 py-4 text-lg font-semibold rounded-2xl hover:from-purple-700 hover:via-indigo-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl border-2 border-white/20">
                Jelajahi Semua Koleksi
              </button>
            </A>
          </div>
        </div>
      </section>

      {/* Featured Collection Section */}
      <section class="bg-gradient-to-b from-white to-gray-50 pt-0 pb-12 sm:pb-16 lg:pb-20">
        {/* Hero Banner */}
        <div class="w-full mb-16 sm:mb-20">
          <div class="relative h-[420px] sm:h-[520px] md:h-[600px] lg:h-[680px] bg-gray-900 overflow-hidden">
            <img 
              src={imgver}
              alt="Collection Image" 
              class="absolute inset-0 w-full h-full object-cover"
              style="object-position: center 25%"
            />
            {/* Readability and focus overlays */}
            <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"></div>
            <div class="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent"></div>
            {/* Subtle radial highlight around subject's head area */}
            <div class="absolute inset-0 pointer-events-none opacity-80" style="background: radial-gradient(ellipse at 60% 25%, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.06) 35%, rgba(255,255,255,0) 60%);"></div>
            
            <div class="relative z-10 h-full flex items-center py-12 sm:py-16 lg:py-20">
              <div class="w-full px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto">
                <div class="max-w-4xl">
                  <div class="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-4 sm:mb-6 border border-white/20 text-white">
                    <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l2.39 4.84L20 8.27l-3.8 3.7.9 5.26L12 15.9l-4.1 2.13.9-5.26L5 8.27l5.61-1.43L12 2z"/>
                    </svg>
                    <span class="text-sm font-medium">Featured Collection</span>
                  </div>
                  <div class="w-14 h-1 bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-400 rounded-full mb-4"></div>
                  <h3 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white drop-shadow-md mb-4 sm:mb-6 leading-[1.1]">
                    Koleksi 
                    <span class="block text-transparent bg-gradient-to-r from-purple-300 via-indigo-300 to-blue-300 bg-clip-text">
                      Eksklusif
                    </span>
                  </h3>
                  <p class="text-xl sm:text-2xl md:text-3xl text-white/90 drop-shadow-sm leading-relaxed font-light max-w-3xl">
                    Dipilih khusus untuk gaya hidup modern yang sustainable dan penuh karakter
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12 sm:mb-16">
            <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-gray-900">Kategori Pilihan</h2>
            <p class="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Temukan koleksi terbaik dalam setiap kategori
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            <A href="/products/category/vintage" class="group">
              <div class="bg-white aspect-square rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 border border-purple-200/50">
                <div class="w-full h-full bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 flex flex-col items-center justify-center relative overflow-hidden p-8">
                  <div class="absolute inset-0 bg-gradient-to-t from-purple-100/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Decorative Elements */}
                  <div class="absolute top-8 left-8 w-16 h-16 bg-purple-200/30 rounded-full"></div>
                  <div class="absolute bottom-8 right-8 w-24 h-24 bg-blue-200/20 rounded-full"></div>
                  
                  <div class="text-center z-10 group-hover:transform group-hover:scale-105 transition-transform duration-300">
                    <div class="w-24 h-24 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-xl group-hover:shadow-2xl transition-shadow duration-300 mx-auto">
                      <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                      </svg>
                    </div>
                    <h4 class="text-2xl sm:text-3xl font-bold text-gray-800 mb-3">Vintage Fashion</h4>
                    <p class="text-gray-600 text-lg leading-relaxed mb-4">Koleksi pakaian vintage pilihan dengan kualitas terbaik</p>
                    <div class="inline-flex items-center text-purple-600 font-semibold group-hover:text-indigo-700 transition-colors">
                      <span>Explore Now</span>
                      <svg class="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </A>

            <A href="/products/category/aksesoris" class="group">
              <div class="bg-white aspect-square rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 border border-purple-200/50">
                <div class="w-full h-full bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 flex flex-col items-center justify-center relative overflow-hidden p-8">
                  <div class="absolute inset-0 bg-gradient-to-t from-purple-100/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Decorative Elements */}
                  <div class="absolute top-12 right-12 w-20 h-20 bg-purple-200/30 rounded-full"></div>
                  <div class="absolute bottom-12 left-12 w-12 h-12 bg-indigo-200/40 rounded-full"></div>
                  
                  <div class="text-center z-10 group-hover:transform group-hover:scale-105 transition-transform duration-300">
                    <div class="w-24 h-24 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-xl group-hover:shadow-2xl transition-shadow duration-300 mx-auto">
                      <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 12H6L5 9z"/>
                      </svg>
                    </div>
                    <h4 class="text-2xl sm:text-3xl font-bold text-gray-800 mb-3">Thrift Accessories</h4>
                    <p class="text-gray-600 text-lg leading-relaxed mb-4">Aksesoris unik dan berkualitas untuk melengkapi gaya Anda</p>
                    <div class="inline-flex items-center text-purple-600 font-semibold group-hover:text-indigo-700 transition-colors">
                      <span>Explore Now</span>
                      <svg class="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </A>
          </div>
        </div>
      </section>

      {/* Shop The Look Section */}
      <section class="relative py-16 sm:py-20 lg:py-24 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12 sm:mb-16">
            <div class="inline-flex items-center gap-2 bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 4a2 2 0 104 0h2a2 2 0 100 4h1l2 12H5L7 8h1a2 2 0 100-4h0z"/>
              </svg>
              Style Inspiration
            </div>
            <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">SHOP THE LOOK</h2>
            <p class="text-lg text-gray-600 max-w-2xl mx-auto">Dapatkan inspirasi gaya lengkap dengan produk pilihan kami</p>
          </div>
          
          {/* Navigation Buttons */}
          <button class="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-xl hover:shadow-2xl transition-all z-20 border border-gray-100 hover:bg-gray-50">
            <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
          </button>
          <button class="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-xl hover:shadow-2xl transition-all z-20 border border-gray-100 hover:bg-gray-50">
            <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </button>

          <div class="flex items-end justify-center gap-6 sm:gap-8 lg:gap-12 px-12 sm:px-16">
            {/* Left Product */}
            <A href="/product/4" class="flex-shrink-0 w-32 sm:w-40 md:w-48 group cursor-pointer">
              <div class="bg-white aspect-[3/4] rounded-2xl overflow-hidden group-hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 shadow-lg border border-gray-100">
                <div class="w-full h-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center group-hover:from-purple-200 group-hover:to-pink-200 transition-all duration-300 relative">
                  <div class="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span class="text-purple-600 font-semibold text-sm z-10">Vintage Jacket</span>
                </div>
              </div>
              <div class="text-center mt-4 space-y-1">
                <p class="text-sm sm:text-base font-semibold text-gray-900">Vintage Jacket</p>
                <p class="text-sm text-gray-600 font-medium">Rp 125.000</p>
              </div>
            </A>

            {/* Center Product (Main) */}
            <div class="flex-shrink-0 w-48 sm:w-64 md:w-80 relative">
              <A href="/product/5" class="block group">
                <div class="bg-white aspect-[3/4] rounded-3xl overflow-hidden relative shadow-2xl border border-gray-100 transform group-hover:scale-105 transition-all duration-500">
                  <div class="w-full h-full bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center group-hover:from-blue-200 group-hover:to-green-200 transition-all duration-300 relative">
                    <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <span class="text-blue-600 font-bold text-lg z-10">Featured Item</span>
                  </div>
                  
                  {/* Quick View Button */}
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    class="absolute top-4 right-4 bg-white p-3 rounded-full shadow-xl hover:shadow-2xl transition-all flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 hover:bg-gray-50"
                  >
                    <svg class="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                    </svg>
                  </button>
                </div>
              </A>
              
              {/* Product Info Card */}
              <div class="absolute -bottom-6 left-6 right-6 bg-white p-4 rounded-2xl shadow-xl z-10 border border-gray-100">
                <p class="text-lg font-bold text-gray-900 mb-1">Uniqlo Pants</p>
                <p class="text-gray-600 text-sm mb-3">Premium Collection</p>
                <div class="flex items-center justify-between">
                  <span class="text-xl font-bold text-gray-900">Rp 150.000</span>
                  <A href="/product/5">
                    <button class="bg-gradient-to-r from-gray-900 to-black text-white px-4 py-2 rounded-xl text-sm font-semibold hover:from-gray-800 hover:to-gray-900 transition-all transform hover:scale-105">
                      View Item
                    </button>
                  </A>
                </div>
              </div>
            </div>

            {/* Right Product */}
            <A href="/product/6" class="flex-shrink-0 w-32 sm:w-40 md:w-48 group cursor-pointer">
              <div class="bg-white aspect-[3/4] rounded-2xl overflow-hidden group-hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 shadow-lg border border-gray-100">
                <div class="w-full h-full bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center group-hover:from-green-200 group-hover:to-blue-200 transition-all duration-300 relative">
                  <div class="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span class="text-green-600 font-semibold text-sm z-10">Retro Sneakers</span>
                </div>
              </div>
              <div class="text-center mt-4 space-y-1">
                <p class="text-sm sm:text-base font-semibold text-gray-900">Retro Sneakers</p>
                <p class="text-sm text-gray-600 font-medium">Rp 200.000</p>
              </div>
            </A>
          </div>

          {/* Dots Indicator */}
          <div class="flex justify-center mt-12 space-x-3">
            <div class="w-3 h-3 bg-gray-900 rounded-full"></div>
            <div class="w-3 h-3 bg-gray-300 rounded-full hover:bg-gray-400 transition-colors cursor-pointer"></div>
            <div class="w-3 h-3 bg-gray-300 rounded-full hover:bg-gray-400 transition-colors cursor-pointer"></div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section class="bg-gradient-to-b from-gray-50 to-white py-12 sm:py-16 lg:py-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12 sm:mb-16">
            <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Aman dan Terlindungi!</h2>
            <p class="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Kami bekerja sama dengan brand terverifikasi dengan seleksi ketat dari berbagai produk berkualitas 
              hingga proses pengemasan yang professional
            </p>
          </div>
          
          <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8">
            {[
              { name: "Uniqlo", color: "from-red-100 to-red-200", icon: "U" },
              { name: "H&M", color: "from-green-100 to-green-200", icon: "H" },
              { name: "Zara", color: "from-blue-100 to-blue-200", icon: "Z" },
              { name: "Nike", color: "from-purple-100 to-purple-200", icon: "N" },
              { name: "Adidas", color: "from-yellow-100 to-yellow-200", icon: "A" }
            ].map((brand, index) => (
              <div class="group">
                <div class="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 text-center border border-gray-100">
                  <div class={`w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br ${brand.color} rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300`}>
                    <span class="text-gray-700 text-2xl sm:text-3xl font-bold">{brand.icon}</span>
                  </div>
                  <p class="text-lg sm:text-xl font-semibold text-gray-900">{brand.name}</p>
                  <p class="text-sm text-gray-600 mt-2">Verified Partner</p>
                </div>
              </div>
            ))}
          </div>

          {/* Trust Features */}
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 sm:mt-20">
            <div class="text-center">
              <div class="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">Kualitas Terjamin</h3>
              <p class="text-gray-600">Setiap produk melalui quality control yang ketat</p>
            </div>
            
            <div class="text-center">
              <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">Pembayaran Aman</h3>
              <p class="text-gray-600">Transaksi aman dengan sistem enkripsi terdepan</p>
            </div>
            
            <div class="text-center">
              <div class="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">Customer Support 24/7</h3>
              <p class="text-gray-600">Tim support siap membantu kapan saja</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
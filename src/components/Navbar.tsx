import { Component, createSignal } from "solid-js";
import { A } from "@solidjs/router";

const Navbar: Component = () => {
  const [isMenuOpen, setIsMenuOpen] = createSignal(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen());
  };

  return (
    <nav class="bg-white shadow-md sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          {/* Logo */}
          <div class="flex-shrink-0">
            <A href="/" class="text-xl sm:text-2xl font-bold text-gray-900">
              THRIFTING
            </A>
          </div>

          {/* Desktop Navigation Menu */}
          <div class="hidden md:block">
            <div class="ml-10 flex items-baseline space-x-6 lg:space-x-8">
              <A 
                href="/" 
                class="text-gray-900 hover:text-gray-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                Featured
              </A>
              <A 
                href="/thrifting" 
                class="text-gray-900 hover:text-gray-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                Thrifting
              </A>
              <A 
                href="/featured" 
                class="text-gray-900 hover:text-gray-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                Featured
              </A>
              <A 
                href="/trending" 
                class="text-gray-900 hover:text-gray-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                Trending
              </A>
            </div>
          </div>

          {/* Desktop Right side buttons */}
          <div class="hidden md:flex items-center space-x-4">
            {/* Search */}
            <div class="relative">
              <input 
                type="text" 
                placeholder="Search for brands or products"
                class="bg-gray-100 rounded-full px-4 py-2 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 w-48 lg:w-64"
              />
              <svg 
                class="absolute left-3 top-2.5 h-4 w-4 text-gray-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  stroke-linecap="round" 
                  stroke-linejoin="round" 
                  stroke-width="2" 
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            {/* Wishlist */}
            <button class="p-2 text-gray-600 hover:text-gray-900 transition-colors">
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path 
                  stroke-linecap="round" 
                  stroke-linejoin="round" 
                  stroke-width="2" 
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>

            {/* Cart */}
            <button class="p-2 text-gray-600 hover:text-gray-900 transition-colors">
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path 
                  stroke-linecap="round" 
                  stroke-linejoin="round" 
                  stroke-width="2" 
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 7H6l-1-7z"
                />
              </svg>
            </button>
          </div>

          {/* Mobile menu buttons and search */}
          <div class="md:hidden flex items-center space-x-2">
            {/* Mobile Search Icon */}
            <button class="p-2 text-gray-600 hover:text-gray-900 transition-colors">
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path 
                  stroke-linecap="round" 
                  stroke-linejoin="round" 
                  stroke-width="2" 
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>

            {/* Mobile Cart */}
            <button class="p-2 text-gray-600 hover:text-gray-900 transition-colors">
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path 
                  stroke-linecap="round" 
                  stroke-linejoin="round" 
                  stroke-width="2" 
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 7H6l-1-7z"
                />
              </svg>
            </button>

            {/* Hamburger Menu Button */}
            <button 
              onClick={toggleMenu}
              class="p-2 text-gray-600 hover:text-gray-900 focus:outline-none focus:text-gray-900 transition-colors"
            >
              {isMenuOpen() ? (
                <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path 
                    stroke-linecap="round" 
                    stroke-linejoin="round" 
                    stroke-width="2" 
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen() && (
          <div class="md:hidden border-t border-gray-200 py-4">
            <div class="flex flex-col space-y-3">
              {/* Mobile Search Bar */}
              <div class="relative px-2 pb-3">
                <input 
                  type="text" 
                  placeholder="Search for brands or products"
                  class="w-full bg-gray-100 rounded-full px-4 py-3 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
                />
                <svg 
                  class="absolute left-5 top-3.5 h-4 w-4 text-gray-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    stroke-linecap="round" 
                    stroke-linejoin="round" 
                    stroke-width="2" 
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>

              {/* Mobile Navigation Links */}
              <A 
                href="/" 
                class="block px-4 py-3 text-base font-medium text-gray-900 hover:bg-gray-50 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Featured
              </A>
              <A 
                href="/thrifting" 
                class="block px-4 py-3 text-base font-medium text-gray-900 hover:bg-gray-50 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Thrifting
              </A>
              <A 
                href="/featured" 
                class="block px-4 py-3 text-base font-medium text-gray-900 hover:bg-gray-50 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Featured
              </A>
              <A 
                href="/trending" 
                class="block px-4 py-3 text-base font-medium text-gray-900 hover:bg-gray-50 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Trending
              </A>

              {/* Mobile Wishlist Button */}
              <button class="flex items-center px-4 py-3 text-base font-medium text-gray-900 hover:bg-gray-50 transition-colors w-full text-left">
                <svg class="h-5 w-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path 
                    stroke-linecap="round" 
                    stroke-linejoin="round" 
                    stroke-width="2" 
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                Wishlist
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

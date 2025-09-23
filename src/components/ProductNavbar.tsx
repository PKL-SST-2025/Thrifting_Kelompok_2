import { Component, createSignal } from "solid-js";
import { A } from "@solidjs/router";
import AuthModal from "../components/AuthModal";

const ProductNavbar: Component = () => {
  const [isMenuOpen, setIsMenuOpen] = createSignal(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = createSignal(false);
  const [authModalTab, setAuthModalTab] = createSignal<"signup" | "signin">("signup");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen());
  };

  const openSignUpModal = () => {
    setAuthModalTab("signup");
    setIsAuthModalOpen(true);
    setIsMenuOpen(false);
  };

  const openSignInModal = () => {
    setAuthModalTab("signin");
    setIsAuthModalOpen(true);
    setIsMenuOpen(false);
  };

  const closeAuthModal = () => setIsAuthModalOpen(false);

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

          {/* Desktop Right side buttons */}
          <div class="hidden md:flex items-center space-x-4">
            {/* Daftar and Masuk buttons */}
            <div class="flex items-center space-x-2">
              <span 
                onClick={openSignUpModal}
                class="text-sm text-gray-600 cursor-pointer hover:text-gray-900 transition-colors"
              >
                Sign Up
              </span>
              <span class="text-sm text-gray-400">|</span>
              <span 
                onClick={openSignInModal}
                class="text-sm text-gray-600 cursor-pointer hover:text-gray-900 transition-colors"
              >
                Sign In
              </span>
            </div>

            {/* Language Selector */}
            <button class="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-900 transition-colors">
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10"/>
                <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
            </button>

            {/* Search */}
            <div class="relative">
              <input 
                type="text" 
                placeholder="Search"
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

          {/* Mobile menu buttons */}
          <div class="md:hidden flex items-center space-x-2">
            {/* Mobile Search Icon */}
            <button class="p-2 text-gray-600 hover:text-gray-900 transition-colors">
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10"/>
                <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
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
                  placeholder="Search"
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

              {/* Mobile Daftar/Masuk - Enhanced buttons */}
              <div class="border-t border-gray-200 pt-3 mt-3 px-4 space-y-3">
                <button 
                  onClick={openSignUpModal}
                  class="w-full text-center py-3 text-base font-medium text-gray-900 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Sign Up
                </button>
                <button 
                  onClick={openSignInModal}
                  class="w-full text-center py-3 text-base font-medium text-white bg-gray-900 rounded-md hover:bg-gray-800 transition-colors"
                >
                  Sign In
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen()} 
        initialTab={authModalTab()}
        onClose={closeAuthModal}
      />
    </nav>
  );
};

export default ProductNavbar;

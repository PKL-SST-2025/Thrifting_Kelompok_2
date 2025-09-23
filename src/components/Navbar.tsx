import { Component, createSignal } from "solid-js";
import { A } from "@solidjs/router";
import AuthModal from "../components/AuthModal";

const Navbar: Component = () => {
  const [isMenuOpen, setIsMenuOpen] = createSignal(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = createSignal(false);
  const [authModalTab, setAuthModalTab] = createSignal<"signup" | "signin">("signup");

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen());

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

          {/* Desktop Navigation - Removed, now just showing auth buttons in right side */}
          
          {/* Desktop Right side buttons */}
          <div class="hidden md:flex items-center space-x-4 flex-1 justify-end">
            {/* Search Bar - Made longer */}
            <div class="relative flex-1 max-w-md">
              <input 
                type="text" 
                placeholder="Search for brands or products"
                class="w-full bg-gray-100 rounded-full px-4 py-2 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-gray-300"
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

            {/* Language Selector */}
            <A href="/settings?section=language" class="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-900 transition-colors">
              <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10"/>
                <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
            </A>

            {/* Daftar and Masuk buttons - Right next to search */}
            <div class="flex items-center space-x-2">
              <span 
                onClick={openSignUpModal}
                class="text-sm text-gray-600 hover:text-gray-900 cursor-pointer transition-colors"
              >
                Sign Up
              </span>
              <span class="text-sm text-gray-400">|</span>
              <span 
                onClick={openSignInModal}
                class="text-sm text-gray-600 hover:text-gray-900 cursor-pointer transition-colors"
              >
                Sign In
              </span>
            </div>

            {/* Wishlist */}
            <A href="/wishlist" class="p-2 text-gray-600 hover:text-gray-900 transition-colors">
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path 
                  stroke-linecap="round" 
                  stroke-linejoin="round" 
                  stroke-width="2" 
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </A>

            {/* Settings */}
            <A href="/settings" class="p-2 text-gray-600 hover:text-gray-900 transition-colors">
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path 
                  stroke-linecap="round" 
                  stroke-linejoin="round" 
                  stroke-width="2" 
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path 
                  stroke-linecap="round" 
                  stroke-linejoin="round" 
                  stroke-width="2" 
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </A>
          </div>

          {/* Mobile menu buttons and search */}
          <div class="md:hidden flex items-center space-x-2">
            {/* Mobile Search Icon */}
            <button class="p-2 text-gray-600 hover:text-gray-900 transition-colors">
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10"/>
                <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
            </button>

            {/* Mobile Settings */}
            <A href="/settings" class="p-2 text-gray-600 hover:text-gray-900 transition-colors">
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path 
                  stroke-linecap="round" 
                  stroke-linejoin="round" 
                  stroke-width="2" 
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path 
                  stroke-linecap="round" 
                  stroke-linejoin="round" 
                  stroke-width="2" 
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </A>

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

              {/* Mobile Wishlist Button */}
              <A href="/wishlist" class="flex items-center px-4 py-3 text-base font-medium text-gray-900 hover:bg-gray-50 transition-colors w-full text-left">
                <svg class="h-5 w-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path 
                    stroke-linecap="round" 
                    stroke-linejoin="round" 
                    stroke-width="2" 
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                Wishlist
              </A>

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

export default Navbar;

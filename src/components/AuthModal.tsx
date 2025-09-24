import { Component, createSignal, createEffect, onMount } from "solid-js";

interface AuthModalProps {
  isOpen: boolean;
  initialTab: "signup" | "signin";
  onClose: () => void;
}

const AuthModal: Component<AuthModalProps> = (props) => {
  const [activeTab, setActiveTab] = createSignal(props.initialTab);
  const [isVisible, setIsVisible] = createSignal(false);

  // Handle modal entrance animation
  onMount(() => {
    if (props.isOpen) {
      setTimeout(() => setIsVisible(true), 10);
    }
  });

  // Watch for prop changes
  createEffect(() => {
    if (props.isOpen && !isVisible()) {
      setTimeout(() => setIsVisible(true), 10);
    } else if (!props.isOpen && isVisible()) {
      setIsVisible(false);
    }
  });

  // Update active tab when initialTab changes
  createEffect(() => {
    setActiveTab(props.initialTab);
  });

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => props.onClose(), 300);
  };

  const switchTab = (tab: "signup" | "signin") => {
    setActiveTab(tab);
  };

  return (
    <>
      {props.isOpen && (
        <div class="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <div 
            class={`absolute inset-0 bg-black transition-opacity duration-300 ${
              isVisible() ? 'opacity-50' : 'opacity-0'
            }`}
            onClick={handleClose}
          ></div>
          
          {/* Modal */}
          <div 
            class={`absolute top-0 right-0 h-full w-full md:w-96 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
              isVisible() ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            {/* Close Button */}
            <button 
              onClick={handleClose}
              class="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>

            {/* Content Container */}
            <div class="p-6 h-full overflow-y-auto">
              {/* Header - Different for each tab */}
              <div class="mb-8">
                {activeTab() === "signup" ? (
                  <>
                    <h2 class="text-3xl font-bold mb-2">Create Account</h2>
                  </>
                ) : (
                  <h2 class="text-3xl font-bold mb-8">Sign In</h2>
                )}
              </div>

              {/* Tabs */}
              <div class="flex border-b mb-6">
                <button 
                  onClick={() => switchTab("signup")}
                  class={`flex-1 pb-3 text-center font-medium transition-colors duration-200 ${
                    activeTab() === "signup" 
                      ? "border-b-2 border-black text-black" 
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Sign Up
                </button>
                <button 
                  onClick={() => switchTab("signin")}
                  class={`flex-1 pb-3 text-center font-medium transition-colors duration-200 ${
                    activeTab() === "signin" 
                      ? "border-b-2 border-black text-black" 
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Sign In
                </button>
              </div>

              {/* Form Content - Using function call for better reactivity */}
              {(() => {
                if (activeTab() === "signup") {
                  return (
                    <form class="space-y-4">
                      <div>
                        <input 
                          type="email" 
                          placeholder="Email"
                          class="w-full pb-2 border-b border-gray-300 focus:border-black focus:outline-none transition-colors"
                        />
                      </div>
                      
                      <div>
                        <input 
                          type="text" 
                          placeholder="Nama Depan"
                          class="w-full pb-2 border-b border-gray-300 focus:border-black focus:outline-none transition-colors"
                        />
                      </div>
                      
                      <div>
                        <input 
                          type="text" 
                          placeholder="Nama Belakang"
                          class="w-full pb-2 border-b border-gray-300 focus:border-black focus:outline-none transition-colors"
                        />
                      </div>

                      {/* Phone Number */}
                      <div class="flex space-x-2">
                        <select class="pb-2 border-b border-gray-300 focus:border-black focus:outline-none">
                          <option value="+62">+62</option>
                        </select>
                        <input 
                          type="tel" 
                          placeholder="Phone Number"
                          class="flex-1 pb-2 border-b border-gray-300 focus:border-black focus:outline-none transition-colors"
                        />
                      </div>

                      {/* Date of Birth */}
                      <div>
                        <p class="text-sm text-gray-600 mb-2">Date of Birth</p>
                        <div class="flex space-x-2">
                          <select class="flex-1 pb-2 border-b border-gray-300 focus:border-black focus:outline-none">
                            <option value="1">1</option>
                            <option value="2">2</option>
                          </select>
                          <select class="flex-1 pb-2 border-b border-gray-300 focus:border-black focus:outline-none">
                            <option value="Jan">Jan</option>
                            <option value="Feb">Feb</option>
                          </select>
                          <select class="flex-1 pb-2 border-b border-gray-300 focus:border-black focus:outline-none">
                            <option value="2000">2000</option>
                            <option value="1999">1999</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <input 
                          type="text" 
                          placeholder="Kode Pos"
                          class="w-full pb-2 border-b border-gray-300 focus:border-black focus:outline-none transition-colors"
                        />
                      </div>

                      <div>
                        <input 
                          type="password" 
                          placeholder="Password"
                          class="w-full pb-2 border-b border-gray-300 focus:border-black focus:outline-none transition-colors"
                        />
                      </div>

                      {/* Password Requirements */}
                      <div class="text-xs text-gray-500 space-y-1">
                        <div class="flex items-center space-x-2">
                          <div class="w-2 h-2 bg-gray-300 rounded-full"></div>
                          <span>8 hingga 25 karakter</span>
                        </div>
                        <div class="flex items-center space-x-2">
                          <div class="w-2 h-2 bg-gray-300 rounded-full"></div>
                          <span>1 Angka</span>
                        </div>
                        <div class="flex items-center space-x-2">
                          <div class="w-2 h-2 bg-gray-300 rounded-full"></div>
                          <span>1 Huruf Kapital</span>
                        </div>
                        <div class="flex items-center space-x-2">
                          <div class="w-2 h-2 bg-gray-300 rounded-full"></div>
                          <span>1 Huruf Kecil</span>
                        </div>
                      </div>

                      {/* Terms Checkbox */}
                      <div class="flex items-start space-x-2 mt-6">
                        <input type="checkbox" class="mt-1" />
                        <p class="text-xs text-gray-600">
                          Dengan membuat akun, Anda menyetujui
                          {' '}<a href="/terms" class="text-purple-600 hover:underline">Syarat & Ketentuan</a>{' '}
                          dan{' '}<a href="/privacy" class="text-purple-600 hover:underline">Kebijakan Privasi</a> kami.
                        </p>
                      </div>

                      {/* Submit Button */}
                      <button 
                        type="submit"
                        class="w-full bg-gray-900 text-white py-3 rounded-md hover:bg-gray-800 transition-colors font-medium mt-6"
                      >
                        Accept & Create Account
                      </button>

                      {/* Sign In Link */}
                      <p class="text-center text-sm mt-4">
                        Already have an account? <button type="button" onClick={() => switchTab("signin")} class="text-purple-600 hover:underline">Login</button>
                      </p>
                    </form>
                  );
                } else {
                  return (
                    <form class="space-y-6">
                      <div>
                        <input 
                          type="email" 
                          placeholder="Email"
                          class="w-full pb-2 border-b border-gray-300 focus:border-black focus:outline-none transition-colors"
                        />
                      </div>
                      
                      <div>
                        <input 
                          type="password" 
                          placeholder="Password"
                          class="w-full pb-2 border-b border-gray-300 focus:border-black focus:outline-none transition-colors"
                        />
                      </div>

                      {/* Submit Button */}
                      <button 
                        type="submit"
                        class="w-full bg-gray-900 text-white py-3 rounded-md hover:bg-gray-800 transition-colors font-medium mt-8"
                      >
                        Get In
                      </button>

                      {/* Policy Note */}
                      <p class="text-center text-xs text-gray-500 mt-3">
                        Dengan masuk, Anda menyetujui <a href="/terms" class="text-purple-600 hover:underline">Syarat & Ketentuan</a> dan <a href="/privacy" class="text-purple-600 hover:underline">Kebijakan Privasi</a>.
                      </p>

                      {/* Sign Up Link */}
                      <p class="text-center text-sm mt-6">
                        Don't have account? <button type="button" onClick={() => switchTab("signup")} class="text-purple-600 hover:underline">Regist</button>
                      </p>
                    </form>
                  );
                }
              })()}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AuthModal;
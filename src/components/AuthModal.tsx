import { Component, createSignal, onMount, createEffect } from "solid-js";
import { register, login, type RegisterPayload, type LoginPayload } from "../lib/api";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab: "signup" | "signin";
}

const AuthModal: Component<AuthModalProps> = (props) => {
  const [activeTab, setActiveTab] = createSignal(props.initialTab);
  const [isVisible, setIsVisible] = createSignal(false);
  const [loading, setLoading] = createSignal(false);
  const [error, setError] = createSignal<string | null>(null);
  
  // Form data
  const [signupData, setSignupData] = createSignal<RegisterPayload>({
    username: "",
    email: "",
    password: ""
  });

  // Additional signup fields
  const [lastName, setLastName] = createSignal("");
  const [phoneNumber, setPhoneNumber] = createSignal("");
  const [birthDate, setBirthDate] = createSignal({ day: "", month: "", year: "" });
  const [agreeToPolicy, setAgreeToPolicy] = createSignal(false);
  
  const [signinData, setSigninData] = createSignal<LoginPayload>({
    email: "",
    password: ""
  });

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
    setError(null);
  };

  // Form validation
  const isSignupValid = () => {
    const data = signupData();
    return data.username.trim().length >= 3 &&
           data.email.trim().includes('@') &&
           data.password.length >= 6 &&
           lastName().trim().length >= 1 &&
           phoneNumber().trim().length >= 8 &&
           birthDate().day && birthDate().month && birthDate().year &&
           agreeToPolicy();
  };

  const isSigninValid = () => {
    const data = signinData();
    return data.email.trim().includes('@') &&
           data.password.length >= 1;
  };

  const handleSignup = async (e: Event) => {
    e.preventDefault();
    if (!isSignupValid()) {
      setError("Mohon lengkapi semua field dengan benar");
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      await register(signupData());
      // Auto login after successful registration
      const response = await login({ email: signupData().email, password: signupData().password });
      console.log('✅ Signup + Login response received:', response);
      
      // Verify that data is actually saved
      const savedToken = localStorage.getItem("authToken");
      const savedUser = localStorage.getItem("user");
      console.log('✅ Verification - Token saved:', !!savedToken, 'User saved:', !!savedUser);
      
      handleClose();
      
      // Dispatch custom event to notify other components
      window.dispatchEvent(new CustomEvent('authStateChanged'));
      
      // Force page reload after a longer delay to ensure everything is saved
      setTimeout(() => {
        window.location.href = window.location.href;
      }, 300);
    } catch (err: any) {
      if (err.message.includes("email already used")) {
        setError("Email sudah terdaftar. Silakan gunakan email lain atau login.");
      } else {
        setError(err.message || "Registrasi gagal");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSignin = async (e: Event) => {
    e.preventDefault();
    if (!isSigninValid()) {
      setError("Mohon masukkan email dan password");
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const response = await login(signinData());
      console.log('✅ Login response received:', response);
      
      // Verify that data is actually saved
      const savedToken = localStorage.getItem("authToken");
      const savedUser = localStorage.getItem("user");
      console.log('✅ Verification - Token saved:', !!savedToken, 'User saved:', !!savedUser);
      
      handleClose();
      
      // Dispatch custom event to notify other components
      window.dispatchEvent(new CustomEvent('authStateChanged'));
      
      // Force page reload after a longer delay to ensure everything is saved
      setTimeout(() => {
        window.location.href = window.location.href;
      }, 300);
    } catch (err: any) {
      setError(err.message || "Login gagal");
    } finally {
      setLoading(false);
    }
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
              {/* Header */}
              <div class="mb-8">
                {activeTab() === "signup" ? (
                  <h2 class="text-3xl font-bold mb-2">Daftar Akun</h2>
                ) : (
                  <h2 class="text-3xl font-bold mb-8">Masuk</h2>
                )}
              </div>

              {/* Tab Navigation */}
              <div class="flex border-b mb-6">
                <button 
                  onClick={() => switchTab("signup")}
                  class={`flex-1 pb-3 text-center font-medium transition-colors ${
                    activeTab() === "signup" ? 'border-b-2 border-black text-black' : 'text-gray-500'
                  }`}
                >
                  Daftar
                </button>
                <button 
                  onClick={() => switchTab("signin")}
                  class={`flex-1 pb-3 text-center font-medium transition-colors ${
                    activeTab() === "signin" ? 'border-b-2 border-black text-black' : 'text-gray-500'
                  }`}
                >
                  Masuk
                </button>
              </div>

              {/* Error Display */}
              {error() && (
                <div class="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                  <p class="text-red-600 text-sm">{error()}</p>
                </div>
              )}

              {/* Forms */}
              {activeTab() === "signup" ? (
                <form onSubmit={handleSignup} class="space-y-4">
                  <div>
                    <input 
                      type="email" 
                      placeholder="Email"
                      required
                      value={signupData().email}
                      onInput={(e) => setSignupData({...signupData(), email: e.currentTarget.value})}
                      class="w-full pb-2 border-b border-gray-300 focus:border-black focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <input 
                      type="text" 
                      placeholder="Username (minimal 3 karakter)"
                      required
                      minlength="3"
                      value={signupData().username}
                      onInput={(e) => setSignupData({...signupData(), username: e.currentTarget.value})}
                      class="w-full pb-2 border-b border-gray-300 focus:border-black focus:outline-none transition-colors"
                    />
                    {signupData().username && signupData().username.length < 3 && (
                      <p class="text-red-500 text-xs mt-1">Username minimal 3 karakter</p>
                    )}
                  </div>

                  <div>
                    <input 
                      type="text" 
                      placeholder="Nama Belakang"
                      required
                      value={lastName()}
                      onInput={(e) => setLastName(e.currentTarget.value)}
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
                      placeholder="Phone Number (minimal 8 digit)"
                      required
                      minlength="8"
                      value={phoneNumber()}
                      onInput={(e) => setPhoneNumber(e.currentTarget.value)}
                      class="flex-1 pb-2 border-b border-gray-300 focus:border-black focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Date of Birth */}
                  <div>
                    <p class="text-sm text-gray-600 mb-2">Date of Birth</p>
                    <div class="flex space-x-2">
                      <select 
                        required
                        value={birthDate().day}
                        onChange={(e) => setBirthDate({...birthDate(), day: e.currentTarget.value})}
                        class="flex-1 pb-2 border-b border-gray-300 focus:border-black focus:outline-none"
                      >
                        <option value="">Day</option>
                        {Array.from({length: 31}, (_, i) => i + 1).map(day => (
                          <option value={day.toString()}>{day}</option>
                        ))}
                      </select>
                      <select 
                        required
                        value={birthDate().month}
                        onChange={(e) => setBirthDate({...birthDate(), month: e.currentTarget.value})}
                        class="flex-1 pb-2 border-b border-gray-300 focus:border-black focus:outline-none"
                      >
                        <option value="">Month</option>
                        <option value="1">Jan</option>
                        <option value="2">Feb</option>
                        <option value="3">Mar</option>
                        <option value="4">Apr</option>
                        <option value="5">May</option>
                        <option value="6">Jun</option>
                        <option value="7">Jul</option>
                        <option value="8">Aug</option>
                        <option value="9">Sep</option>
                        <option value="10">Oct</option>
                        <option value="11">Nov</option>
                        <option value="12">Dec</option>
                      </select>
                      <select 
                        required
                        value={birthDate().year}
                        onChange={(e) => setBirthDate({...birthDate(), year: e.currentTarget.value})}
                        class="flex-1 pb-2 border-b border-gray-300 focus:border-black focus:outline-none"
                      >
                        <option value="">Year</option>
                        {Array.from({length: 80}, (_, i) => 2024 - i).map(year => (
                          <option value={year.toString()}>{year}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <input 
                      type="password" 
                      placeholder="Password (minimal 6 karakter)"
                      required
                      minlength="6"
                      value={signupData().password}
                      onInput={(e) => setSignupData({...signupData(), password: e.currentTarget.value})}
                      class="w-full pb-2 border-b border-gray-300 focus:border-black focus:outline-none transition-colors"
                    />
                    {signupData().password && signupData().password.length < 6 && (
                      <p class="text-red-500 text-xs mt-1">Password minimal 6 karakter</p>
                    )}
                  </div>

                  {/* Policy Agreement */}
                  <div class="flex items-start space-x-3 mt-6">
                    <input 
                      type="checkbox" 
                      id="agree-policy"
                      required
                      checked={agreeToPolicy()}
                      onChange={(e) => setAgreeToPolicy(e.currentTarget.checked)}
                      class="mt-1 rounded border-gray-300 text-black focus:ring-black focus:ring-offset-0"
                    />
                    <label for="agree-policy" class="text-sm text-gray-600 leading-relaxed">
                      Saya setuju dengan{" "}
                      <a href="#" class="text-black underline hover:no-underline">
                        Syarat dan Ketentuan
                      </a>{" "}
                      serta{" "}
                      <a href="#" class="text-black underline hover:no-underline">
                        Kebijakan Privasi
                      </a>{" "}
                      yang berlaku.
                    </label>
                  </div>

                  <button 
                    type="submit" 
                    disabled={loading() || !isSignupValid()}
                    class={`w-full py-3 rounded-md font-medium transition-colors mt-6 ${
                      loading() || !isSignupValid()
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-black text-white hover:bg-gray-800'
                    }`}
                  >
                    {loading() ? 'Mendaftar...' : 'Daftar'}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleSignin} class="space-y-6">
                  <div>
                    <input 
                      type="email" 
                      placeholder="Email"
                      required
                      value={signinData().email}
                      onInput={(e) => setSigninData({...signinData(), email: e.currentTarget.value})}
                      class="w-full pb-2 border-b border-gray-300 focus:border-black focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <input 
                      type="password" 
                      placeholder="Password"
                      required
                      value={signinData().password}
                      onInput={(e) => setSigninData({...signinData(), password: e.currentTarget.value})}
                      class="w-full pb-2 border-b border-gray-300 focus:border-black focus:outline-none transition-colors"
                    />
                  </div>

                  <button 
                    type="submit" 
                    disabled={loading() || !isSigninValid()}
                    class={`w-full py-3 rounded-md font-medium transition-colors ${
                      loading() || !isSigninValid()
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-black text-white hover:bg-gray-800'
                    }`}
                  >
                    {loading() ? 'Masuk...' : 'Masuk'}
                  </button>

                  <div class="text-center">
                    <a href="#" class="text-sm text-gray-600 hover:text-black">
                      Lupa password?
                    </a>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AuthModal;
// Enhanced API client for thrifting app with robust error handling
// - Automatic retries and fallbacks for better reliability
// - Multiple backend URL attempts
// - Comprehensive error handling and logging

// Try multiple backend URLs for better connection reliability
const BACKEND_URLS = [
  (import.meta as any)?.env?.VITE_API_BASE || "http://localhost:8081",
  "http://localhost:8081",
  "http://127.0.0.1:8081"
];

export const API_BASE = BACKEND_URLS[0];

function getToken(): string | null {
  try {
    return localStorage.getItem("authToken");
  } catch {
    return null;
  }
}

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

// Enhanced API fetch with retries and better error handling
export async function apiFetch<T = unknown>(
  path: string,
  opts: {
    method?: HttpMethod;
    body?: any;
    headers?: Record<string, string>;
    auth?: boolean;
    retries?: number;
  } = {}
): Promise<T> {
  const { method = "GET", body, headers = {}, auth = true, retries = 1 } = opts;
  const token = getToken();
  
  const finalHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    ...headers,
  };
  
  // Only add authorization header if we have a valid (non-demo) token
  if (auth && token && !token.startsWith('demo-token')) {
    finalHeaders["Authorization"] = `Bearer ${token}`;
  } else if (auth && (!token || token.startsWith('demo-token'))) {
    // For requests requiring auth but no valid token, throw early
    throw new Error('Authentication required - please login');
  }

  // Try multiple backend URLs
  for (const baseUrl of BACKEND_URLS) {
    const url = path.startsWith("http") ? path : `${baseUrl}${path}`;
    
    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        console.log(`API Request: ${method} ${url} (attempt ${attempt + 1})`);
        
        const res = await fetch(url, {
          method,
          headers: finalHeaders,
          body: body !== undefined ? JSON.stringify(body) : undefined,
        });

        if (!res.ok) {
          const text = await res.text().catch(() => "");
          const errorMsg = `API ${method} ${path} failed: ${res.status} ${res.statusText} ${text}`.trim();
          console.error(errorMsg);
          
          if (attempt === retries) {
            throw new Error(errorMsg);
          }
          continue; // Try next attempt
        }

        console.log(`API Success: ${method} ${url}`);
        
        // Try parse JSON; if empty, return as any
        const contentType = res.headers.get("content-type") || "";
        if (contentType.includes("application/json")) {
          const data = await res.json();
          return data as T;
        }
        return res.text() as any;
        
      } catch (error) {
        console.error(`API attempt ${attempt + 1} failed:`, error);
        if (attempt === retries) {
          // Try next backend URL
          break;
        }
        // Wait before retry
        await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
      }
    }
  }
  
  // If all attempts fail, throw final error
  throw new Error(`All API attempts failed for ${method} ${path}. Backend may be unavailable.`);
}

// Domain helpers and types
export type User = {
  id: string;
  username: string;
  email: string;
  created_at: string;
};

export type AuthResponse = {
  token: string;
  user: User;
};

// Test backend connection with fallback-friendly approach
export async function testBackendConnection(): Promise<boolean> {
  console.log('🔍 Testing backend connection...');
  
  try {
    // Try the main products endpoint first (most likely to exist)
    await apiFetch('/products', { 
      method: 'GET', 
      auth: false,
      retries: 1 // Limited retries for test
    });
    console.log('✅ Backend connection successful via /products');
    return true;
  } catch (error) {
    console.log('❌ /products endpoint failed, trying alternatives...');
    
    // Try alternative endpoints
    const testEndpoints = ['/health', '/', '/api/health'];
    
    for (const endpoint of testEndpoints) {
      try {
        console.log(`Testing: ${endpoint}...`);
        await apiFetch(endpoint, { 
          method: 'GET', 
          auth: false,
          retries: 0
        });
        console.log(`✅ Backend connection successful via ${endpoint}`);
        return true;
      } catch (err) {
        console.log(`❌ ${endpoint} failed`);
      }
    }
  }
  
  console.warn('⚠️ Backend connection failed - using fallback mode');
  return false;
}

// Initialize and test all systems
export async function initializeApp(): Promise<{
  backendConnected: boolean;
  authStatus: boolean;
  userProfile: User | null;
}> {
  console.log('🚀 Initializing application systems...');
  
  const backendConnected = await testBackendConnection();
  const authStatus = isAuthenticated();
  let userProfile = null;
  
  if (authStatus) {
    try {
      userProfile = getCurrentUser();
      console.log('✅ User authenticated:', userProfile?.email);
    } catch (error) {
      console.error('❌ Failed to get user profile:', error);
    }
  }
  
  const status = {
    backendConnected,
    authStatus,
    userProfile
  };
  
  console.log('📊 App initialization status:', status);
  return status;
}

export type RegisterPayload = {
  username: string;
  email: string;
  password: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type NotificationSettings = {
  email: boolean;
  newArrivals: boolean;
  promotions: boolean;
  orderUpdates: boolean;
};

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  condition: string;
  seller_id: string;
  images: string[];
  created_at: string;
};

// Auth functions
export async function register(payload: RegisterPayload): Promise<AuthResponse> {
  const response = await apiFetch<AuthResponse>("/auth/register", { 
    method: "POST", 
    body: payload, 
    auth: false 
  });
  
  // Store token in localStorage
  if (response.token) {
    localStorage.setItem("authToken", response.token);
    localStorage.setItem("user", JSON.stringify(response.user));
  }
  
  return response;
}

export async function login(payload: LoginPayload): Promise<AuthResponse> {
  console.log('🔄 Attempting login for:', payload.email);
  
  // First, try to login and get the token
  const response = await apiFetch<{token: string}>("/auth/login", { 
    method: "POST", 
    body: payload, 
    auth: false 
  });
  
  console.log('📨 Login response received:', response);
  
  if (!response.token) {
    console.error('❌ No token in login response');
    throw new Error('Login failed - no token received');
  }
  
  // Store the token temporarily to use for getting user profile
  const token = response.token;
  localStorage.setItem("authToken", token);
  
  try {
    // Now fetch user profile using the token
    console.log('🔄 Fetching user profile after login...');
    const userProfile = await apiFetch<User>("/users/me", { 
      method: "GET", 
      auth: true 
    });
    
    console.log('📨 User profile received:', userProfile);
    
    // Create user object with email from login if not in profile
    const user: User = {
      id: userProfile.id || 'unknown',
      username: userProfile.username || payload.email.split('@')[0],
      email: userProfile.email || payload.email,
      created_at: userProfile.created_at || new Date().toISOString()
    };
    
    // Store both token and user data
    try {
      localStorage.setItem("authToken", token);
      localStorage.setItem("user", JSON.stringify(user));
      
      // Verify the data was actually saved
      const verifyToken = localStorage.getItem("authToken");
      const verifyUser = localStorage.getItem("user");
      
      if (verifyToken === token && verifyUser) {
        console.log('✅ Login data successfully saved to localStorage');
        console.log('✅ Token:', token.substring(0, 20) + '...');
        console.log('✅ User:', user.email);
      } else {
        console.error('❌ Failed to verify localStorage save operation');
      }
    } catch (storageError) {
      console.error('❌ Error saving to localStorage:', storageError);
      throw new Error('Failed to save login data');
    }
    
    // Return the expected AuthResponse format
    return {
      token: token,
      user: user
    };
    
  } catch (profileError) {
    console.log('⚠️ Could not fetch user profile, using fallback user data');
    
    // Create fallback user data from login payload
    const fallbackUser: User = {
      id: 'temp-' + Date.now(),
      username: payload.email.split('@')[0],
      email: payload.email,
      created_at: new Date().toISOString()
    };
    
    // Store fallback data
    localStorage.setItem("user", JSON.stringify(fallbackUser));
    
    console.log('✅ Login successful with fallback user data');
    console.log('✅ Token:', token.substring(0, 20) + '...');
    console.log('✅ User (fallback):', fallbackUser.email);
    
    return {
      token: token,
      user: fallbackUser
    };
  }
}

export function logout(): void {
  localStorage.removeItem("authToken");
  localStorage.removeItem("user");
  window.location.href = "/";
}

export function getCurrentUser(): User | null {
  try {
    const userStr = localStorage.getItem("user");
    if (!userStr || userStr === "null" || userStr === "undefined") {
      console.log('No user data in localStorage');
      return null;
    }
    
    const user = JSON.parse(userStr);
    console.log('User loaded from localStorage:', user);
    return user;
  } catch (error) {
    console.error('Failed to parse user from localStorage:', error);
    localStorage.removeItem("user"); // Clear corrupted data
    return null;
  }
}

export function isAuthenticated(): boolean {
  const token = getToken();
  const user = getCurrentUser();
  
  // Check for valid token (not demo token) and valid user (not demo user)
  const hasValidToken = token && !token.startsWith('demo-token');
  const hasValidUser = user && user.id !== 'demo-user';
  
  const isAuth = !!(hasValidToken && hasValidUser);
  
  console.log('🔍 Authentication check:');
  console.log('  - Token exists:', !!token);
  console.log('  - Valid token (not demo):', !!hasValidToken);
  console.log('  - User exists:', !!user);
  console.log('  - Valid user (not demo):', !!hasValidUser);
  console.log('  - Final authenticated status:', isAuth);
  
  if (token) {
    console.log('  - Token preview:', token.substring(0, 20) + '...');
  }
  if (user) {
    console.log('  - User info:', user.email, user.id);
  }
  
  return isAuth;
}

// Check if user is currently in demo mode
export function isDemoUser(): boolean {
  const user = getCurrentUser();
  const token = getToken();
  return !!(user && user.id === 'demo-user') || !!(token && token.startsWith('demo-token'));
}

// Mock/fallback data functions
export function createDemoUser(): User {
  const demoUser: User = {
    id: "demo-user",
    username: "Demo User", 
    email: "demo@thrifting.com",
    created_at: new Date().toISOString()
  };
  
  // Store demo user in localStorage
  localStorage.setItem("user", JSON.stringify(demoUser));
  localStorage.setItem("authToken", "demo-token-" + Date.now());
  
  console.log('Created demo user:', demoUser);
  return demoUser;
}

export function getOrCreateUser(): User | null {
  const currentUser = getCurrentUser();
  if (currentUser && isAuthenticated()) {
    return currentUser;
  }
  
  console.log('No authenticated user found');
  return null;
}

// Initialize app user check - no auto demo creation
export function initializeAppUser(): void {
  const currentUser = getCurrentUser();
  const token = getToken();
  const authenticated = isAuthenticated();
  
  console.log('🚀 Initializing app user - Current user:', !!currentUser, 'Token:', !!token, 'Authenticated:', authenticated);
  
  if (authenticated) {
    console.log('✅ User authenticated:', currentUser?.username, currentUser?.email);
  } else {
    console.log('❌ No authenticated user - please login');
    // Clear any invalid/demo tokens
    if (token && token.startsWith('demo-token')) {
      localStorage.removeItem('authToken');
    }
    if (currentUser && currentUser.id === 'demo-user') {
      localStorage.removeItem('user');
    }
  }
}

function getMockProducts(): Product[] {
  return [
    {
      id: 1,
      name: "Vintage Band T-Shirt",
      price: 150000,
      category: "pakaian",
      condition: "bekas baik",
      description: "T-shirt band vintage kondisi sangat baik",
      images: ["/assets/1000021576.jpg"],
      seller_id: "1",
      created_at: new Date().toISOString()
    },
    {
      id: 2,
      name: "Classic Vinyl Record",
      price: 250000,
      category: "musik",
      condition: "bekas baik",
      description: "Piringan hitam Abbey Road original",
      images: ["/assets/abbey road (1969).jpg"],
      seller_id: "1",
      created_at: new Date().toISOString()
    }
  ];
}

// Products functions
export async function getProducts(filters?: {
  category?: string;
  condition?: string;
  min_price?: number;
  max_price?: number;
}): Promise<Product[]> {
  try {
    const params = new URLSearchParams();
    if (filters?.category) params.append("category", filters.category);
    if (filters?.condition) params.append("condition", filters.condition);
    if (filters?.min_price) params.append("min_price", filters.min_price.toString());
    if (filters?.max_price) params.append("max_price", filters.max_price.toString());
    
    const query = params.toString() ? `?${params}` : "";
    const products = await apiFetch<Product[]>(`/products${query}`, { method: "GET", auth: false });
    
    // Cache products in localStorage for offline access
    try {
      localStorage.setItem('cachedProducts', JSON.stringify(products));
    } catch {}
    
    return products;
  } catch (error) {
    console.error('Failed to fetch products from backend:', error);
    
    // Fallback to cached products
    try {
      const cached = localStorage.getItem('cachedProducts');
      if (cached) {
        console.log('Using cached products from localStorage');
        return JSON.parse(cached);
      }
    } catch {}
    
    // Final fallback to mock data
    console.log('Using fallback mock products');
    return getMockProducts();
  }
}

export async function getProduct(id: number): Promise<Product> {
  try {
    return await apiFetch<Product>(`/products/${id}`, { method: "GET", auth: false });
  } catch (error) {
    throw new Error('Produk tidak ditemukan atau terjadi kesalahan.');
  }
}

export async function getWishlist(): Promise<Product[]> {
  // Try to fetch wishlist from backend first (requires auth)
  if (!isAuthenticated()) {
    throw new Error('Anda harus login untuk melihat wishlist');
  }

  try {
    // Backend expected to return list of products
    const remote = await apiFetch<Product[]>('/wishlist', { method: 'GET', auth: true });
    return remote || [];
  } catch (err: any) {
    // If authentication required, rethrow so UI can prompt login
    if (err && typeof err.message === 'string' && err.message.includes('Authentication required')) {
      throw err;
    }

    console.log('Wishlist GET failed, falling back to localStorage:', err);

    // Fallback to per-user localStorage
    const user = getCurrentUser();
    if (!user) return [];
    try {
      const wishlistRaw = localStorage.getItem(`wishlist_${user.id}`);
      if (!wishlistRaw) return [];
      const wishlistIds = JSON.parse(wishlistRaw);
      const allProducts = await getProducts();
      return allProducts.filter(p => wishlistIds.includes(p.id));
    } catch (storageError) {
      console.error('Failed to load wishlist from localStorage fallback:', storageError);
      return [];
    }
  }
}

export async function addToWishlist(productId: number): Promise<{ ok: boolean }> {
  if (!isAuthenticated()) {
    throw new Error('Anda harus login untuk menambah wishlist');
  }

  try {
    // Try backend POST first
    const res = await apiFetch<{ ok: boolean }>('/wishlist', { method: 'POST', body: { product_id: productId }, auth: true });
    return res;
  } catch (err: any) {
    // If authentication required, rethrow
    if (err && typeof err.message === 'string' && err.message.includes('Authentication required')) {
      throw err;
    }

    console.log('Wishlist POST failed, using localStorage fallback:', err);

    // Fallback to per-user localStorage
    const user = getCurrentUser();
    if (!user) throw new Error('User tidak ditemukan');
    const key = `wishlist_${user.id}`;
    try {
      const wishlistRaw = localStorage.getItem(key);
      const wishlist = wishlistRaw ? JSON.parse(wishlistRaw) : [];
      if (!wishlist.includes(productId)) {
        wishlist.push(productId);
        localStorage.setItem(key, JSON.stringify(wishlist));
      }
      return { ok: true };
    } catch (storageError) {
      console.error('Failed to save wishlist to localStorage fallback:', storageError);
      return { ok: false };
    }
  }
}

export async function removeFromWishlist(productId: number): Promise<{ ok: boolean }> {
  if (!isAuthenticated()) {
    throw new Error('Anda harus login untuk menghapus wishlist');
  }

  try {
    // Try backend DELETE first
    const res = await apiFetch<{ ok: boolean }>(`/wishlist/${productId}`, { method: 'DELETE', auth: true });
    return res;
  } catch (err: any) {
    // If authentication required, rethrow
    if (err && typeof err.message === 'string' && err.message.includes('Authentication required')) {
      throw err;
    }

    console.log('Wishlist DELETE failed, using localStorage fallback:', err);

    // Fallback to per-user localStorage
    const user = getCurrentUser();
    if (!user) throw new Error('User tidak ditemukan');
    const key = `wishlist_${user.id}`;
    try {
      const wishlistRaw = localStorage.getItem(key);
      const wishlist = wishlistRaw ? JSON.parse(wishlistRaw) : [];
      const newWishlist = wishlist.filter((id: number) => id !== productId);
      localStorage.setItem(key, JSON.stringify(newWishlist));
      return { ok: true };
    } catch (storageError) {
      console.error('Failed to update wishlist in localStorage fallback:', storageError);
      return { ok: false };
    }
  }
}

// Wishlist functions
export async function getWishlistDeprecated(): Promise<Product[]> {
  // Check authentication first
  if (!isAuthenticated()) {
    console.log('User not authenticated - cannot access wishlist');
    return [];
  }

  try {
    return await apiFetch<Product[]>("/wishlist", { method: "GET" });
  } catch (error) {
    console.log('Wishlist GET not available, using localStorage fallback');
    
    // Fallback to localStorage for authenticated users only
    try {
      const currentUser = getCurrentUser();
      if (!currentUser) return [];
      
      const existingWishlist = localStorage.getItem(`wishlist_${currentUser.id}`);
      const wishlistIds = existingWishlist ? JSON.parse(existingWishlist) : [];
      
      // Get products from cache or mock data
      const allProducts = getMockProducts();
      const wishlistProducts = allProducts.filter(product => 
        wishlistIds.includes(product.id)
      );
      
      return wishlistProducts;
    } catch (storageError) {
      console.error('Failed to load from localStorage:', storageError);
      return [];
    }
  }
}

export async function addToWishlistDeprecated(productId: number): Promise<{ ok: boolean }> {
  // Check authentication first
  if (!isAuthenticated()) {
    console.log('User not authenticated - cannot add to wishlist');
    return { ok: false };
  }

  try {
    return await apiFetch<{ ok: boolean }>("/wishlist", { 
      method: "POST", 
      body: { product_id: productId } 
    });
  } catch (error) {
    console.log('Wishlist POST not available, using localStorage fallback');
    
    // Fallback to localStorage for authenticated users only
    try {
      const currentUser = getCurrentUser();
      if (!currentUser) return { ok: false };
      
      const existingWishlist = localStorage.getItem(`wishlist_${currentUser.id}`);
      const wishlist = existingWishlist ? JSON.parse(existingWishlist) : [];
      
      // Add product ID if not already in wishlist
      if (!wishlist.includes(productId)) {
        wishlist.push(productId);
        localStorage.setItem(`wishlist_${currentUser.id}`, JSON.stringify(wishlist));
      }
      
      return { ok: true };
    } catch (storageError) {
      console.error('Failed to save to localStorage:', storageError);
      return { ok: false };
    }
  }
}

export async function removeFromWishlistDeprecated(productId: number): Promise<{ ok: boolean }> {
  // Check authentication first
  if (!isAuthenticated()) {
    console.log('User not authenticated - cannot remove from wishlist');
    return { ok: false };
  }

  try {
    return await apiFetch<{ ok: boolean }>(`/wishlist/${productId}`, { method: "DELETE" });
  } catch (error) {
    console.log('Wishlist DELETE not available, using localStorage fallback');
    
    // Fallback to localStorage for authenticated users only
    try {
      const currentUser = getCurrentUser();
      if (!currentUser) return { ok: false };
      
      const existingWishlist = localStorage.getItem(`wishlist_${currentUser.id}`);
      const wishlist = existingWishlist ? JSON.parse(existingWishlist) : [];
      
      // Remove product ID from wishlist
      const updatedWishlist = wishlist.filter((id: number) => id !== productId);
      localStorage.setItem(`wishlist_${currentUser.id}`, JSON.stringify(updatedWishlist));
      
      return { ok: true };
    } catch (storageError) {
      console.error('Failed to update localStorage:', storageError);
      return { ok: false };
    }
  }
}

// User profile functions
export async function getUserProfile(userId?: string): Promise<User> {
  const endpoint = userId ? `/users/${userId}` : "/users/me";
  
  try {
    return await apiFetch<User>(endpoint, { method: "GET" });
  } catch (error) {
    console.log('getUserProfile: endpoint not available, returning current user from localStorage');
    
    // Fallback to current user from localStorage
    const currentUser = getCurrentUser();
    if (currentUser) {
      return currentUser;
    }
    
    // If no current user, throw the original error
    throw error;
  }
}

export async function updateUserProfile(payload: Partial<User>): Promise<User> {
  try {
    return await apiFetch<User>("/users/me", { method: "PUT", body: payload });
  } catch (error) {
    console.log('updateUserProfile: endpoint not available, updating localStorage only');
    
    // Fallback to updating localStorage
    const currentUser = getCurrentUser();
    if (currentUser) {
      const updatedUser = { ...currentUser, ...payload };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      return updatedUser;
    }
    
    throw new Error('Cannot update profile - no current user');
  }
}

// Product management functions
export async function updateProduct(id: string | number, payload: Partial<Product>): Promise<Product> {
  return apiFetch<Product>(`/products/${id}`, { method: "PUT", body: payload });
}

export async function deleteProduct(id: string | number): Promise<{ ok: boolean }> {
  return apiFetch<{ ok: boolean }>(`/products/${id}`, { method: "DELETE" });
}

export async function getUserProducts(userId?: string): Promise<Product[]> {
  const endpoint = userId ? `/products?seller_id=${userId}` : "/products?seller_id=me";
  return apiFetch<Product[]>(endpoint, { method: "GET" });
}

// Store/Shop functions with fallback
export async function getStores(): Promise<any[]> {
  try {
    return await apiFetch<any[]>("/stores", { method: "GET", auth: false });
  } catch (error) {
    console.log('Using fallback stores data');
    return [
      { city: 'Jakarta', address: 'Jl. Thrift No. 12, Kemang', hours: '10:00 - 21:00', phone: '021-555-1234' },
      { city: 'Bandung', address: 'Jl. Vintage No. 8, Dago', hours: '10:00 - 21:00', phone: '022-555-5678' },
      { city: 'Surabaya', address: 'Jl. Retro No. 21, Darmo', hours: '10:00 - 21:00', phone: '031-555-9012' },
      { city: 'Yogyakarta', address: 'Jl. Malioboro No. 34', hours: '10:00 - 21:00', phone: '0274-555-3456' },
    ];
  }
}

export async function getStore(id: string): Promise<any> {
  try {
    return await apiFetch<any>(`/stores/${id}`, { method: "GET", auth: false });
  } catch (error) {
    console.log('Store detail not available from backend');
    return null;
  }
}

// Support functions with fallback
export async function createSupportTicket(payload: { subject: string; message: string; category?: string }): Promise<{ ok: boolean; id: string }> {
  try {
    return await apiFetch<{ ok: boolean; id: string }>("/support", { method: "POST", body: payload });
  } catch (error) {
    console.log('Support ticket saved locally (backend unavailable)');
    // Save to localStorage for when backend comes back
    const tickets = JSON.parse(localStorage.getItem('pendingSupportTickets') || '[]');
    const ticket = { ...payload, id: Date.now().toString(), timestamp: new Date().toISOString() };
    tickets.push(ticket);
    localStorage.setItem('pendingSupportTickets', JSON.stringify(tickets));
    return { ok: true, id: ticket.id };
  }
}

export async function getSupportTickets(): Promise<any[]> {
  try {
    return await apiFetch<any[]>("/support", { method: "GET" });
  } catch (error) {
    // Return pending tickets from localStorage
    return JSON.parse(localStorage.getItem('pendingSupportTickets') || '[]');
  }
}

// FAQ functions with fallback
export async function getFAQs(): Promise<any[]> {
  try {
    return await apiFetch<any[]>("/faq", { method: "GET", auth: false });
  } catch (error) {
    console.log('Using fallback FAQ data');
    return [
      { question: 'Bagaimana cara mengubah bahasa dan mata uang?', answer: 'Masuk ke Settings → Country & Language, pilih bahasa dan mata uang, lalu simpan.' },
      { question: 'Bagaimana mengatur notifikasi?', answer: 'Buka Settings → Notifications untuk menyalakan atau mematikan jenis notifikasi.' },
      { question: 'Apakah bisa refund?', answer: 'Kebijakan refund mengikuti ketentuan toko penjual. Silakan hubungi penjual melalui halaman pesanan.' },
      { question: 'Bagaimana cara menambahkan produk?', answer: 'Klik tombol "Add Stuff" di navbar, lengkapi form produk, dan submit.' },
      { question: 'Apakah ada biaya untuk menjual?', answer: 'Pendaftaran dan listing produk gratis. Biaya transaksi akan dipotong dari penjualan yang berhasil.' }
    ];
  }
}

export async function getFAQ(id: string): Promise<any> {
  return apiFetch<any>(`/faq/${id}`, { method: "GET", auth: false });
}

// Settings functions with fallback
export async function getUserSettings(): Promise<any> {
  try {
    return await apiFetch<any>("/settings", { method: "GET" });
  } catch (error) {
    console.log('Using localStorage fallback for user settings');
    // Fallback to localStorage
    try {
      const settings = localStorage.getItem('userSettings');
      return settings ? JSON.parse(settings) : null;
    } catch {
      return null;
    }
  }
}

export async function updateUserSettings(payload: any): Promise<any> {
  try {
    const result = await apiFetch<any>("/settings", { method: "POST", body: payload });
    // Cache in localStorage
    localStorage.setItem('userSettings', JSON.stringify(payload));
    return result;
  } catch (error) {
    console.log('Backend unavailable, saving to localStorage only');
    // Fallback to localStorage only
    localStorage.setItem('userSettings', JSON.stringify(payload));
    return { ok: true, cached: true };
  }
}

// Notifications functions
export async function getNotificationSettings(): Promise<NotificationSettings> {
  return apiFetch<NotificationSettings>("/notifications/settings", { method: "GET" });
}

export async function updateNotificationSettings(payload: NotificationSettings): Promise<{ ok: boolean } | NotificationSettings> {
  return apiFetch("/notifications/settings", { method: "POST", body: payload });
}

export async function getNotifications(): Promise<any[]> {
  return apiFetch<any[]>("/notifications", { method: "GET" });
}

export async function markNotificationRead(id: string): Promise<{ ok: boolean }> {
  return apiFetch<{ ok: boolean }>(`/notifications/${id}/read`, { method: "POST" });
}

export async function createProduct(payload: Omit<Product, "id" | "seller_id" | "created_at">): Promise<Product> {
  return apiFetch<Product>("/products", { method: "POST", body: payload });
}

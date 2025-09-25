import { createEffect, createSignal, Show, onMount } from 'solid-js';
import { useNavigate, useSearchParams } from '@solidjs/router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SettingsSidebar from '../components/SettingsSidebar';
import Shop from './Shop';
import MyProfile from './MyProfile';
import Notifications from './Notifications';
import CountryLanguage from './CountryLanguage';
import { createSupportTicket, getFAQs, getStores, testBackendConnection, initializeApp } from '../lib/api';

const Settings = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = createSignal('profile');
  const [systemStatus, setSystemStatus] = createSignal({
    backendConnected: false,
    authStatus: false,
    userProfile: null,
    initialized: false
  });

  // Initialize systems and check connection
  onMount(async () => {
    try {
      console.log('🔄 Settings: Initializing all systems...');
      const status = await initializeApp();
      setSystemStatus({
        ...status,
        initialized: true
      });
      
      if (!status.backendConnected) {
        console.warn('⚠️  Backend connection failed - some features may not work');
      }
    } catch (error) {
      console.error('❌ Settings: System initialization failed:', error);
      setSystemStatus(prev => ({ ...prev, initialized: true }));
    }

    // Initialize from URL
    const section = searchParams.section;
    if (typeof section === 'string' && ['profile', 'shop', 'notifications', 'language', 'stores', 'support', 'faq'].includes(section)) {
      setActiveSection(section);
    }
  });

  // Keep URL in sync with active section
  createEffect(() => {
    const section = activeSection();
    setSearchParams({ section });

    // Handle logout pseudo-action
    if (section === 'logout') {
      try {
        // Clear known keys; keep full clear minimalistic to avoid unexpected loss
        localStorage.removeItem('userProfile');
        localStorage.removeItem('notificationSettings');
        localStorage.removeItem('localeSettings');
        localStorage.removeItem('authToken');
      } catch {}
      navigate('/', { replace: true });
    }
  });

  return (
    <div class="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Navbar />
      
  <div class="max-w-7xl mx-auto px-4 py-8">
        {/* System Status */}
        <Show when={systemStatus().initialized}>
          <div class="mb-6">
            <div class={`p-4 rounded-lg border ${
              systemStatus().backendConnected 
                ? 'bg-green-50 border-green-200 text-green-800' 
                : 'bg-red-50 border-red-200 text-red-800'
            }`}>
              <div class="flex items-center gap-3">
                <div class={`w-3 h-3 rounded-full ${
                  systemStatus().backendConnected ? 'bg-green-500' : 'bg-red-500'
                }`}></div>
                <div class="text-sm font-medium">
                  {systemStatus().backendConnected 
                    ? '✅ Backend terhubung - Semua fitur tersedia' 
                    : '❌ Backend tidak terhubung - Menggunakan data lokal'}
                </div>
                <Show when={systemStatus().authStatus && systemStatus().userProfile}>
                  <div class="text-sm text-gray-600">
                    | 👤 {systemStatus().userProfile?.username || systemStatus().userProfile?.email}
                  </div>
                </Show>
              </div>
            </div>
          </div>
        </Show>

        <div class="flex gap-8">
          {/* Sidebar */}
          <SettingsSidebar activeSection={activeSection} setActiveSection={setActiveSection} />

          {/* Main Content */}
          <div class="flex-1">
            <Show when={activeSection() === 'profile'}>
              <MyProfile />
            </Show>
            <Show when={activeSection() === 'shop'}>
              <Shop />
            </Show>
            <Show when={activeSection() === 'notifications'}>
              <Notifications />
            </Show>
            <Show when={activeSection() === 'language'}>
              <CountryLanguage />
            </Show>
            <Show when={activeSection() === 'stores'}>
              <StoresSection />
            </Show>
            <Show when={activeSection() === 'support'}>
              <SupportSection />
            </Show>
            <Show when={activeSection() === 'faq'}>
              <FAQSection />
            </Show>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

// Other sections (implemented)
const StoresSection = () => {
  const [stores, setStores] = createSignal([
    { city: 'Jakarta', address: 'Jl. Thrift No. 12, Kemang', hours: '10:00 - 21:00', phone: '021-555-1234' },
    { city: 'Bandung', address: 'Jl. Vintage No. 8, Dago', hours: '10:00 - 21:00', phone: '022-555-5678' },
    { city: 'Surabaya', address: 'Jl. Retro No. 21, Darmo', hours: '10:00 - 21:00', phone: '031-555-9012' },
    { city: 'Yogyakarta', address: 'Jl. Malioboro No. 34', hours: '10:00 - 21:00', phone: '0274-555-3456' },
  ]);
  const [loadStatus, setLoadStatus] = createSignal('');

  onMount(async () => {
    setLoadStatus('Memuat data toko dari server...');
    
    try {
      console.log('🏪 Loading stores from backend...');
      
      // Test backend connection first
      const backendOk = await testBackendConnection();
      if (!backendOk) {
        setLoadStatus('⚠️ Menggunakan data toko lokal (server tidak terjangkau)');
        setTimeout(() => setLoadStatus(''), 3000);
        return;
      }
      
      const backendStores = await getStores();
      if (backendStores && backendStores.length > 0) {
        setStores(backendStores);
        setLoadStatus('✅ Data toko dimuat dari server');
        console.log('✅ Loaded stores from backend:', backendStores);
      } else {
        setLoadStatus('⚠️ Menggunakan data toko lokal');
      }
      
      setTimeout(() => setLoadStatus(''), 2000);
      
    } catch (error) {
      console.error('❌ Backend stores failed:', error);
      setLoadStatus('⚠️ Menggunakan data toko lokal (error dari server)');
      setTimeout(() => setLoadStatus(''), 3000);
    }
  });

  return (
    <div class="bg-white rounded-lg shadow-sm p-6 sm:p-8">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl font-bold text-gray-900">Our Stores</h2>
        <span class="text-sm text-gray-600">Jam operasional dapat berubah saat hari libur</span>
      </div>

      <Show when={loadStatus()}>
        <div class={`mb-4 p-3 rounded-lg text-sm ${
          loadStatus().includes('✅') ? 'bg-green-100 text-green-800' :
          loadStatus().includes('⚠️') ? 'bg-yellow-100 text-yellow-800' :
          'bg-blue-100 text-blue-800'
        }`}>
          {loadStatus()}
        </div>
      </Show>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stores().map((s) => (
        <div class="border border-gray-200 rounded-xl p-5">
          <div class="flex items-center justify-between mb-3">
            <h3 class="text-lg font-semibold text-gray-900">{s.city}</h3>
            <span class="inline-flex items-center px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700">Buka {s.hours}</span>
          </div>
          <p class="text-sm text-gray-700">{s.address}</p>
          <p class="text-sm text-gray-600 mt-1">Tel: {s.phone}</p>
          <div class="mt-4 flex gap-2">
            <button class="px-3 py-2 text-sm rounded-lg border border-gray-300 hover:bg-gray-50">Lihat peta</button>
            <a class="px-3 py-2 text-sm rounded-lg border border-gray-300 hover:bg-gray-50" href={`tel:${s.phone}`}>Telepon</a>
          </div>
        </div>
      ))}
    </div>

    <div class="mt-8">
      <div class="w-full h-64 bg-gray-100 border border-gray-200 rounded-xl flex items-center justify-center text-gray-500">Map Placeholder</div>
    </div>
  </div>
  );
};

const SupportSection = () => {
  let nameRef: HTMLInputElement | undefined;
  let emailRef: HTMLInputElement | undefined;
  let subjectRef: HTMLInputElement | undefined;
  let messageRef: HTMLTextAreaElement | undefined;
  const [isSubmitting, setIsSubmitting] = createSignal(false);
  const [submitStatus, setSubmitStatus] = createSignal('');

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('Mengirim pesan...');
    
    const payload = {
      name: nameRef?.value || '',
      email: emailRef?.value || '',
      subject: subjectRef?.value || '',
      message: messageRef?.value || '',
    };
    
    // Basic validation
    if (!payload.name || !payload.email || !payload.message) {
      setSubmitStatus('Mohon lengkapi semua field yang diperlukan');
      setIsSubmitting(false);
      return;
    }
    
    try {
      console.log('🎫 Submitting support ticket to backend:', payload);
      
      // Test backend connection first
      const backendOk = await testBackendConnection();
      if (!backendOk) {
        throw new Error('Backend tidak dapat dijangkau');
      }
      
      await createSupportTicket(payload);
      setSubmitStatus('✅ Pesan berhasil terkirim ke server!');
      
      // Clear form
      if (nameRef) nameRef.value = '';
      if (emailRef) emailRef.value = '';
      if (subjectRef) subjectRef.value = '';
      if (messageRef) messageRef.value = '';
      
      // Clear status after 3 seconds
      setTimeout(() => setSubmitStatus(''), 3000);
      
    } catch (error) {
      console.error('❌ Failed to submit support ticket:', error);
      const errorMsg = error instanceof Error ? error.message : 'Unknown error';
      setSubmitStatus(`❌ Gagal mengirim pesan: ${errorMsg}`);
      
      // Clear error after 5 seconds
      setTimeout(() => setSubmitStatus(''), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div class="bg-white rounded-lg shadow-sm p-6 sm:p-8">
      <h2 class="text-2xl font-bold text-gray-900 mb-6">Customer Support</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="md:col-span-2">
          <form class="space-y-4" onSubmit={handleSubmit}>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input ref={nameRef} type="text" placeholder="Nama" required class="w-full p-3 border border-gray-300 rounded-lg focus:ring-gray-300 focus:border-gray-400" />
              <input ref={emailRef} type="email" placeholder="Email" required class="w-full p-3 border border-gray-300 rounded-lg focus:ring-gray-300 focus:border-gray-400" />
            </div>
            <input ref={subjectRef} type="text" placeholder="Subjek" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-gray-300 focus:border-gray-400" />
            <textarea ref={messageRef} rows={5} placeholder="Pesan" required class="w-full p-3 border border-gray-300 rounded-lg focus:ring-gray-300 focus:border-gray-400" />
            
            <Show when={submitStatus()}>
              <div class={`p-3 rounded-lg text-sm ${submitStatus().includes('✅') ? 'bg-green-100 text-green-800' : 
                             submitStatus().includes('❌') ? 'bg-red-100 text-red-800' : 
                             'bg-blue-100 text-blue-800'}`}>
                {submitStatus()}
              </div>
            </Show>
            
            <button 
              type="submit" 
              disabled={isSubmitting()}
              class={`w-full sm:w-auto px-6 py-3 rounded-lg text-white ${
                isSubmitting() 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-gray-900 hover:bg-black'
              }`}
            >
              {isSubmitting() ? 'Mengirim...' : 'Kirim'}
            </button>
          </form>
        </div>
        <div class="space-y-4">
          <div class="p-4 border border-gray-200 rounded-lg">
            <h4 class="font-semibold text-gray-900">FAQ</h4>
            <p class="text-sm text-gray-600">Cek pertanyaan yang sering diajukan</p>
            <a href="#" class="text-sm text-gray-900 underline">Buka FAQ</a>
          </div>
          <div class="p-4 border border-gray-200 rounded-lg">
            <h4 class="font-semibold text-gray-900">Email</h4>
            <p class="text-sm text-gray-600">support@thrifting.co</p>
          </div>
          <div class="p-4 border border-gray-200 rounded-lg">
            <h4 class="font-semibold text-gray-900">Jam Layanan</h4>
            <p class="text-sm text-gray-600">Senin - Jumat, 09:00 - 18:00 WIB</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const FAQSection = () => {
  const [faqs, setFaqs] = createSignal([
    { question: 'Bagaimana cara mengubah bahasa dan mata uang?', answer: 'Masuk ke Settings → Country & Language, pilih bahasa dan mata uang, lalu simpan.' },
    { question: 'Bagaimana mengatur notifikasi?', answer: 'Buka Settings → Notifications untuk menyalakan atau mematikan jenis notifikasi.' },
    { question: 'Apakah bisa refund?', answer: 'Kebijakan refund mengikuti ketentuan toko penjual. Silakan hubungi penjual melalui halaman pesanan.' },
  ]);
  const [isLoading, setIsLoading] = createSignal(false);
  const [loadStatus, setLoadStatus] = createSignal('');

  onMount(async () => {
    setIsLoading(true);
    setLoadStatus('Memuat FAQ dari server...');
    
    try {
      console.log('🔍 Loading FAQs from backend...');
      
      // Test backend connection first
      const backendOk = await testBackendConnection();
      if (!backendOk) {
        setLoadStatus('⚠️ Menggunakan FAQ lokal (server tidak terjangkau)');
        setTimeout(() => setLoadStatus(''), 3000);
        return;
      }
      
      const backendFaqs = await getFAQs();
      if (backendFaqs && backendFaqs.length > 0) {
        setFaqs(backendFaqs);
        setLoadStatus('✅ FAQ dimuat dari server');
        console.log('✅ Loaded FAQs from backend:', backendFaqs);
      } else {
        setLoadStatus('⚠️ Menggunakan FAQ lokal');
      }
      
      setTimeout(() => setLoadStatus(''), 2000);
      
    } catch (error) {
      console.error('❌ Backend FAQs failed:', error);
      setLoadStatus('⚠️ Menggunakan FAQ lokal (error dari server)');
      setTimeout(() => setLoadStatus(''), 3000);
    } finally {
      setIsLoading(false);
    }
  });

  return (
    <div class="bg-white rounded-lg shadow-sm p-6 sm:p-8">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl font-bold text-gray-900">FAQ</h2>
        <Show when={isLoading()}>
          <div class="text-sm text-gray-600">Loading...</div>
        </Show>
      </div>
      
      <Show when={loadStatus()}>
        <div class={`mb-4 p-3 rounded-lg text-sm ${
          loadStatus().includes('✅') ? 'bg-green-100 text-green-800' :
          loadStatus().includes('⚠️') ? 'bg-yellow-100 text-yellow-800' :
          'bg-blue-100 text-blue-800'
        }`}>
          {loadStatus()}
        </div>
      </Show>
      
      <div class="divide-y divide-gray-200 border border-gray-200 rounded-lg">
        {faqs().map((item) => (
        <details class="group">
          <summary class="list-none p-4 cursor-pointer flex items-center justify-between">
            <span class="font-medium text-gray-900">{item.question}</span>
            <span class="text-gray-400 group-open:rotate-180 transition-transform">⌄</span>
          </summary>
          <div class="p-4 pt-0 text-sm text-gray-700">{item.answer}</div>
        </details>
      ))}
    </div>
  </div>
  );
};

export default Settings;
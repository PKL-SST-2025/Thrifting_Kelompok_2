import { createEffect, createSignal, Show, onMount } from 'solid-js';
import { useNavigate, useSearchParams } from '@solidjs/router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SettingsSidebar from '../components/SettingsSidebar';
import Shop from './Shop';
import MyProfile from './MyProfile';
import Notifications from './Notifications';
import CountryLanguage from './CountryLanguage';

const Settings = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = createSignal('profile');

  // Initialize from URL
  onMount(() => {
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
const StoresSection = () => (
  <div class="bg-white rounded-lg shadow-sm p-6 sm:p-8">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-2xl font-bold text-gray-900">Our Stores</h2>
      <span class="text-sm text-gray-600">Jam operasional dapat berubah saat hari libur</span>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      {[
        { city: 'Jakarta', address: 'Jl. Thrift No. 12, Kemang', hours: '10:00 - 21:00', phone: '021-555-1234' },
        { city: 'Bandung', address: 'Jl. Vintage No. 8, Dago', hours: '10:00 - 21:00', phone: '022-555-5678' },
        { city: 'Surabaya', address: 'Jl. Retro No. 21, Darmo', hours: '10:00 - 21:00', phone: '031-555-9012' },
        { city: 'Yogyakarta', address: 'Jl. Malioboro No. 34', hours: '10:00 - 21:00', phone: '0274-555-3456' },
      ].map((s) => (
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

const SupportSection = () => {
  let nameRef: HTMLInputElement | undefined;
  let emailRef: HTMLInputElement | undefined;
  let subjectRef: HTMLInputElement | undefined;
  let messageRef: HTMLTextAreaElement | undefined;
  const handleSubmit = (e: Event) => {
    e.preventDefault();
    // Simulate send
    const payload = {
      name: nameRef?.value || '',
      email: emailRef?.value || '',
      subject: subjectRef?.value || '',
      message: messageRef?.value || '',
    };
    console.log('Support message submitted', payload);
    alert('Pesan terkirim! Kami akan membalas melalui email.');
    if (nameRef) nameRef.value = '';
    if (emailRef) emailRef.value = '';
    if (subjectRef) subjectRef.value = '';
    if (messageRef) messageRef.value = '';
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
            <textarea ref={messageRef} rows={5} placeholder="Pesan" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-gray-300 focus:border-gray-400" />
            <button type="submit" class="w-full sm:w-auto px-6 py-3 rounded-lg bg-gray-900 text-white hover:bg-black">Kirim</button>
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

const FAQSection = () => (
  <div class="bg-white rounded-lg shadow-sm p-6 sm:p-8">
    <h2 class="text-2xl font-bold text-gray-900 mb-6">FAQ</h2>
    <div class="divide-y divide-gray-200 border border-gray-200 rounded-lg">
      {[
        { q: 'Bagaimana cara mengubah bahasa dan mata uang?', a: 'Masuk ke Settings → Country & Language, pilih bahasa dan mata uang, lalu simpan.' },
        { q: 'Bagaimana mengatur notifikasi?', a: 'Buka Settings → Notifications untuk menyalakan atau mematikan jenis notifikasi.' },
        { q: 'Apakah bisa refund?', a: 'Kebijakan refund mengikuti ketentuan toko penjual. Silakan hubungi penjual melalui halaman pesanan.' },
      ].map((item) => (
        <details class="group">
          <summary class="list-none p-4 cursor-pointer flex items-center justify-between">
            <span class="font-medium text-gray-900">{item.q}</span>
            <span class="text-gray-400 group-open:rotate-180 transition-transform">⌄</span>
          </summary>
          <div class="p-4 pt-0 text-sm text-gray-700">{item.a}</div>
        </details>
      ))}
    </div>
  </div>
);

export default Settings;
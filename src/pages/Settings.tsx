import { createSignal, Show, onMount } from 'solid-js';
import { useSearchParams } from '@solidjs/router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SettingsSidebar from '../components/SettingsSidebar';
import Shop from './Shop';
import MyProfile from './MyProfile';
import Notifications from './Notifications';
import CountryLanguage from './CountryLanguage';

const Settings = () => {
  const [searchParams] = useSearchParams();
  const [activeSection, setActiveSection] = createSignal('profile');

  // Check URL parameters on mount
  onMount(() => {
    const section = searchParams.section;
    if (typeof section === 'string' && ['profile', 'shop', 'notifications', 'language', 'stores', 'support', 'faq'].includes(section)) {
      setActiveSection(section);
    }
  });

  return (
    <div class="min-h-screen bg-gray-50">
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

// Other sections (placeholder components)
const StoresSection = () => (
  <div class="bg-white rounded-lg shadow-sm p-8">
    <h2 class="text-2xl font-bold text-gray-900 mb-6">Our Stores</h2>
    <p class="text-gray-600">Find our physical store locations.</p>
  </div>
);

const SupportSection = () => (
  <div class="bg-white rounded-lg shadow-sm p-8">
    <h2 class="text-2xl font-bold text-gray-900 mb-6">Customer Support</h2>
    <p class="text-gray-600">Get help with your questions and issues.</p>
  </div>
);

const FAQSection = () => (
  <div class="bg-white rounded-lg shadow-sm p-8">
    <h2 class="text-2xl font-bold text-gray-900 mb-6">FAQ</h2>
    <p class="text-gray-600">Frequently asked questions and answers.</p>
  </div>
);

export default Settings;
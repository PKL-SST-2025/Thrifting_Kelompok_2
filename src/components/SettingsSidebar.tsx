import { createSignal, Accessor, Setter } from 'solid-js';
import { A } from '@solidjs/router';

interface SettingsSidebarProps {
  activeSection: Accessor<string>;
  setActiveSection: Setter<string>;
}

const SettingsSidebar = (props: SettingsSidebarProps) => {
  return (
    <div class="w-64 bg-white rounded-lg shadow-sm p-6">
      <div class="space-y-6">
        {/* Account Settings Section */}
        <div>
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Account Settings</h3>
          <div class="space-y-2">
            <button
              onClick={() => props.setActiveSection('profile')}
              class={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                props.activeSection() === 'profile'
                  ? 'bg-purple-50 text-purple-700 border-l-4 border-purple-500'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              My profile
            </button>
            <button
              onClick={() => props.setActiveSection('shop')}
              class={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                props.activeSection() === 'shop'
                  ? 'bg-purple-50 text-purple-700 border-l-4 border-purple-500'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Shop
            </button>
          </div>
        </div>

        {/* Settings Section */}
        <div>
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Settings</h3>
          <div class="space-y-2">
            <button
              onClick={() => props.setActiveSection('notifications')}
              class={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                props.activeSection() === 'notifications'
                  ? 'bg-purple-50 text-purple-700 border-l-4 border-purple-500'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Notifications
            </button>
            <button
              onClick={() => props.setActiveSection('language')}
              class={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                props.activeSection() === 'language'
                  ? 'bg-purple-50 text-purple-700 border-l-4 border-purple-500'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Country & Language
            </button>
          </div>
        </div>

        {/* Support Section */}
        <div>
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Support</h3>
          <div class="space-y-2">
            <button
              onClick={() => props.setActiveSection('stores')}
              class={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                props.activeSection() === 'stores'
                  ? 'bg-purple-50 text-purple-700 border-l-4 border-purple-500'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Our Stores
            </button>
            <button
              onClick={() => props.setActiveSection('support')}
              class={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                props.activeSection() === 'support'
                  ? 'bg-purple-50 text-purple-700 border-l-4 border-purple-500'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Customer Support
            </button>
            <button
              onClick={() => props.setActiveSection('faq')}
              class={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                props.activeSection() === 'faq'
                  ? 'bg-purple-50 text-purple-700 border-l-4 border-purple-500'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              FAQ
            </button>
            <button onClick={() => props.setActiveSection('logout')} class="w-full text-left px-3 py-2 rounded-md text-gray-600 hover:bg-gray-50 transition-colors">Log Out</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsSidebar;
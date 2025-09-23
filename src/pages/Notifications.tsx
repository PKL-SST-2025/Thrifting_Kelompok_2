import { createSignal } from 'solid-js';

const Notifications = () => {
  const [notificationSettings, setNotificationSettings] = createSignal({
    email: true,
    newArrivals: true,
    promotions: true,
    orderUpdates: true
  });

  const updateNotificationSetting = (setting: string, value: boolean) => {
    setNotificationSettings(prev => ({ ...prev, [setting]: value }));
  };

  const handleUpdatePreferences = () => {
    console.log('Updated preferences:', notificationSettings());
    // Add your update logic here
  };

  return (
    <div class="bg-white rounded-lg shadow-sm p-8">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl font-bold text-gray-900">Notifications</h2>
      </div>

      {/* Notifications Settings */}
      <div class="space-y-6">
        {/* Notifications Type Header */}
        <div class="flex items-center justify-between pb-4 border-b border-gray-200">
          <div>
            <h3 class="text-lg font-medium text-gray-900">Notifications type</h3>
            <p class="text-sm text-gray-500 mt-1">Choose how you want to receive notifications</p>
          </div>
          <div class="flex items-center space-x-2">
            <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span class="text-sm text-gray-500">Email notifications</span>
          </div>
        </div>

        {/* Notification Options */}
        <div class="space-y-4">
          {/* New Arrivals */}
          <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div class="flex-1">
              <h4 class="font-medium text-gray-900">New Arrivals</h4>
              <p class="text-sm text-gray-600 mt-1">
                Dapatkan update terbaru tentang barang baru yang tersedia di platform
              </p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notificationSettings().newArrivals}
                onChange={(e) => updateNotificationSetting('newArrivals', e.currentTarget.checked)}
                class="sr-only peer"
              />
              <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500"></div>
            </label>
          </div>

          {/* Promotions */}
          <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div class="flex-1">
              <h4 class="font-medium text-gray-900">Promotions</h4>
              <p class="text-sm text-gray-600 mt-1">
                Jangan lewatkan promo spesial, promo terbatas
              </p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notificationSettings().promotions}
                onChange={(e) => updateNotificationSetting('promotions', e.currentTarget.checked)}
                class="sr-only peer"
              />
              <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500"></div>
            </label>
          </div>

          {/* Orders Updates */}
          <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div class="flex-1">
              <h4 class="font-medium text-gray-900">Orders Updates</h4>
              <p class="text-sm text-gray-600 mt-1">
                Get updates on your orders
              </p>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notificationSettings().orderUpdates}
                onChange={(e) => updateNotificationSetting('orderUpdates', e.currentTarget.checked)}
                class="sr-only peer"
              />
              <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500"></div>
            </label>
          </div>
        </div>

        {/* Update Button */}
        <div class="pt-6">
          <button
            onClick={handleUpdatePreferences}
            class="w-full bg-gray-800 text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-900 transition-colors"
          >
            UPDATE PREFERENSI SAYA
          </button>
        </div>

        {/* Additional Info */}
        <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
          <div class="flex items-start">
            <svg class="w-5 h-5 text-blue-400 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h4 class="text-sm font-medium text-blue-800">Notification Settings</h4>
              <p class="text-sm text-blue-700 mt-1">
                You can change these preferences anytime. Email notifications will be sent to your registered email address.
              </p>
            </div>
          </div>
        </div>

        {/* Notification History */}
        <div class="mt-8">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Recent Notifications</h3>
          <div class="space-y-3">
            {[
              {
                type: 'new-arrival',
                title: 'New vintage jacket arrived!',
                message: 'Check out the latest vintage collection that just arrived.',
                time: '2 hours ago',
                read: false
              },
              {
                type: 'promotion',
                title: 'Flash Sale - 50% Off',
                message: 'Limited time offer on selected thrift items.',
                time: '1 day ago',
                read: true
              },
              {
                type: 'order',
                title: 'Order Shipped',
                message: 'Your order #TH-001 has been shipped and is on the way.',
                time: '2 days ago',
                read: true
              }
            ].map((notification, index) => (
              <div class={`p-4 rounded-lg border ${notification.read ? 'bg-gray-50 border-gray-200' : 'bg-blue-50 border-blue-200'}`}>
                <div class="flex items-start justify-between">
                  <div class="flex-1">
                    <div class="flex items-center space-x-2">
                      <h4 class={`font-medium ${notification.read ? 'text-gray-900' : 'text-blue-900'}`}>
                        {notification.title}
                      </h4>
                      {!notification.read && (
                        <span class="w-2 h-2 bg-red-500 rounded-full"></span>
                      )}
                    </div>
                    <p class={`text-sm mt-1 ${notification.read ? 'text-gray-600' : 'text-blue-700'}`}>
                      {notification.message}
                    </p>
                    <p class="text-xs text-gray-500 mt-2">{notification.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
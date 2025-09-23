import { createSignal } from 'solid-js';

const CountryLanguage = () => {
  const [selectedCountry, setSelectedCountry] = createSignal('Indonesia');
  const [selectedLanguage, setSelectedLanguage] = createSignal('Bahasa Indonesia');
  const [selectedCurrency, setSelectedCurrency] = createSignal('IDR (Rp)');
  const [selectedTimezone, setSelectedTimezone] = createSignal('GMT+7 (WIB)');

  const countries = [
    'Indonesia',
    'Malaysia',
    'Singapore',
    'Thailand',
    'Philippines',
    'Vietnam',
    'United States',
    'United Kingdom',
    'Australia',
    'Japan'
  ];

  const languages = [
    'Bahasa Indonesia',
    'English',
    'Bahasa Malaysia',
    'ภาษาไทย (Thai)',
    'Tiếng Việt (Vietnamese)',
    '日本語 (Japanese)',
    'Français (French)',
    'Español (Spanish)'
  ];

  const currencies = [
    'IDR (Rp)',
    'USD ($)',
    'MYR (RM)',
    'SGD (S$)',
    'THB (฿)',
    'PHP (₱)',
    'EUR (€)',
    'GBP (£)',
    'JPY (¥)'
  ];

  const timezones = [
    'GMT+7 (WIB)',
    'GMT+8 (WITA)',
    'GMT+9 (WIT)',
    'GMT+8 (Malaysia/Singapore)',
    'GMT+7 (Thailand)',
    'GMT+8 (Philippines)',
    'GMT-5 (EST)',
    'GMT+0 (GMT)',
    'GMT+9 (JST)'
  ];

  const handleSaveSettings = () => {
    console.log('Settings saved:', {
      country: selectedCountry(),
      language: selectedLanguage(),
      currency: selectedCurrency(),
      timezone: selectedTimezone()
    });
    // Add your save logic here
  };

  return (
    <div class="bg-white rounded-lg shadow-sm p-8">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl font-bold text-gray-900">Country & Language</h2>
      </div>

      {/* Settings Form */}
      <div class="space-y-8">
        {/* Country Selection */}
        <div class="bg-gray-50 rounded-lg p-6">
          <div class="flex items-center space-x-3 mb-4">
            <div class="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-900">Country/Region</h3>
              <p class="text-sm text-gray-600">Select your country or region</p>
            </div>
          </div>
          <div class="relative">
            <select
              value={selectedCountry()}
              onChange={(e) => setSelectedCountry(e.currentTarget.value)}
              class="w-full p-4 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 appearance-none bg-white text-gray-900"
            >
              {countries.map((country) => (
                <option value={country}>{country}</option>
              ))}
            </select>
            <svg class="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Language Selection */}
        <div class="bg-gray-50 rounded-lg p-6">
          <div class="flex items-center space-x-3 mb-4">
            <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-900">Language</h3>
              <p class="text-sm text-gray-600">Choose your preferred language</p>
            </div>
          </div>
          <div class="relative">
            <select
              value={selectedLanguage()}
              onChange={(e) => setSelectedLanguage(e.currentTarget.value)}
              class="w-full p-4 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 appearance-none bg-white text-gray-900"
            >
              {languages.map((language) => (
                <option value={language}>{language}</option>
              ))}
            </select>
            <svg class="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Currency Selection */}
        <div class="bg-gray-50 rounded-lg p-6">
          <div class="flex items-center space-x-3 mb-4">
            <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-900">Currency</h3>
              <p class="text-sm text-gray-600">Select your preferred currency</p>
            </div>
          </div>
          <div class="relative">
            <select
              value={selectedCurrency()}
              onChange={(e) => setSelectedCurrency(e.currentTarget.value)}
              class="w-full p-4 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 appearance-none bg-white text-gray-900"
            >
              {currencies.map((currency) => (
                <option value={currency}>{currency}</option>
              ))}
            </select>
            <svg class="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Timezone Selection */}
        <div class="bg-gray-50 rounded-lg p-6">
          <div class="flex items-center space-x-3 mb-4">
            <div class="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-900">Timezone</h3>
              <p class="text-sm text-gray-600">Set your local timezone</p>
            </div>
          </div>
          <div class="relative">
            <select
              value={selectedTimezone()}
              onChange={(e) => setSelectedTimezone(e.currentTarget.value)}
              class="w-full p-4 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 appearance-none bg-white text-gray-900"
            >
              {timezones.map((timezone) => (
                <option value={timezone}>{timezone}</option>
              ))}
            </select>
            <svg class="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Current Settings Preview */}
        <div class="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 class="text-lg font-semibold text-blue-900 mb-4">Current Settings</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="flex items-center space-x-3">
              <span class="text-sm font-medium text-blue-700 w-20">Country:</span>
              <span class="text-sm text-blue-800">{selectedCountry()}</span>
            </div>
            <div class="flex items-center space-x-3">
              <span class="text-sm font-medium text-blue-700 w-20">Language:</span>
              <span class="text-sm text-blue-800">{selectedLanguage()}</span>
            </div>
            <div class="flex items-center space-x-3">
              <span class="text-sm font-medium text-blue-700 w-20">Currency:</span>
              <span class="text-sm text-blue-800">{selectedCurrency()}</span>
            </div>
            <div class="flex items-center space-x-3">
              <span class="text-sm font-medium text-blue-700 w-20">Timezone:</span>
              <span class="text-sm text-blue-800">{selectedTimezone()}</span>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div class="pt-4">
          <button
            onClick={handleSaveSettings}
            class="w-full bg-gray-800 text-white py-4 px-6 rounded-lg font-medium hover:bg-gray-900 transition-colors"
          >
            SAVE PREFERENCES
          </button>
        </div>

        {/* Additional Info */}
        <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div class="flex items-start">
            <svg class="w-5 h-5 text-yellow-400 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <div>
              <h4 class="text-sm font-medium text-yellow-800">Important Note</h4>
              <p class="text-sm text-yellow-700 mt-1">
                Changing your country or language preferences may affect product availability, pricing, and content display. These changes will take effect immediately after saving.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryLanguage;
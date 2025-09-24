import { createSignal, Show, onMount } from 'solid-js';
import { A } from '@solidjs/router';

const MyProfile = () => {
  const [isEditing, setIsEditing] = createSignal(false);
  const [userInfo, setUserInfo] = createSignal({
    username: 'Hi, Conrad',
    email: 'conrad@example.com',
    bio: 'Passionate thrift shopper and sustainable fashion enthusiast',
    location: 'Jakarta, Indonesia'
  });

  onMount(() => {
    try {
      const raw = localStorage.getItem('userProfile');
      if (raw) setUserInfo({ ...userInfo(), ...JSON.parse(raw) });
    } catch {}
  });

  const handleEditProfile = () => {
    setIsEditing(!isEditing());
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    try {
      localStorage.setItem('userProfile', JSON.stringify(userInfo()));
      alert('Profil disimpan');
    } catch {}
  };

  const updateUserInfo = (field: string, value: string) => {
    setUserInfo(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div class="bg-white rounded-lg shadow-sm p-4 sm:p-6 lg:p-8">
      <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">My Profile</h2>
      
      {/* Profile Header */}
      <div class="bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 rounded-2xl p-4 sm:p-6 lg:p-8 mb-6 relative border border-purple-200/50 shadow-lg overflow-hidden">
        {/* Decorative Elements */}
        <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-200/30 to-indigo-200/30 rounded-full -translate-y-16 translate-x-16"></div>
        <div class="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-200/40 to-purple-200/40 rounded-full translate-y-12 -translate-x-12"></div>
        
        <div class="relative z-10 flex flex-col sm:flex-row items-center sm:items-center space-y-6 sm:space-y-0 sm:space-x-6">
          {/* Profile Image */}
          <div class="relative">
            <div class="w-32 h-32 bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 rounded-2xl flex items-center justify-center shadow-xl ring-4 ring-white/50 backdrop-blur-sm transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <span class="text-white text-4xl font-bold tracking-wider">C</span>
            </div>
            <div class="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl border-4 border-white shadow-lg flex items-center justify-center">
              <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <Show when={isEditing()}>
              <button class="absolute -top-2 -right-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-3 rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 shadow-lg transform hover:scale-105">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            </Show>
          </div>

          {/* Username */}
          <div class="flex-1 text-center sm:text-left">
            <Show
              when={isEditing()}
              fallback={
                <div>
                  <h3 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">{userInfo().username}</h3>
                  <p class="text-gray-600 font-medium">Active Member</p>
                </div>
              }
            >
              <input
                type="text"
                value={userInfo().username}
                onInput={(e) => updateUserInfo('username', e.currentTarget.value)}
                class="text-2xl sm:text-3xl font-bold text-gray-900 bg-transparent border-b-2 border-purple-400 focus:border-indigo-500 focus:outline-none transition-colors w-full"
              />
            </Show>
          </div>

          {/* Edit Button */}
          <button
            onClick={isEditing() ? handleSaveProfile : handleEditProfile}
            class={`px-8 py-3 rounded-2xl font-semibold transition-all duration-300 shadow-xl transform hover:scale-105 hover:shadow-2xl ${
              isEditing()
                ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600'
                : 'bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white hover:from-purple-700 hover:via-indigo-700 hover:to-blue-700'
            }`}
          >
            {isEditing() ? (
              <span class="flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M5 13l4 4L19 7" />
                </svg>
                Save Profile
              </span>
            ) : (
              <span class="flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit Profile
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Profile Details */}
      <div class="space-y-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <Show
            when={isEditing()}
            fallback={<p class="text-gray-900 p-3 bg-gray-50 rounded-lg">{userInfo().email}</p>}
          >
            <input
              type="email"
              value={userInfo().email}
              onInput={(e) => updateUserInfo('email', e.currentTarget.value)}
              class="w-full p-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
            />
          </Show>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Bio</label>
          <Show
            when={isEditing()}
            fallback={<p class="text-gray-900 p-3 bg-gray-50 rounded-lg">{userInfo().bio}</p>}
          >
            <textarea
              value={userInfo().bio}
              onInput={(e) => updateUserInfo('bio', e.currentTarget.value)}
              rows={3}
              class="w-full p-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
            />
          </Show>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Location</label>
          <Show
            when={isEditing()}
            fallback={<p class="text-gray-900 p-3 bg-gray-50 rounded-lg">{userInfo().location}</p>}
          >
            <input
              type="text"
              value={userInfo().location}
              onInput={(e) => updateUserInfo('location', e.currentTarget.value)}
              class="w-full p-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
            />
          </Show>
        </div>
      </div>

      {/* Wishlist and Recently Viewed */}
      <div class="mt-8">
        <div class="flex space-x-8 mb-6">
          <button class="text-lg font-semibold text-gray-900 border-b-2 border-purple-500 pb-2">
            Wishlist
          </button>
          <button class="text-lg font-medium text-gray-500 pb-2 hover:text-gray-700">
            Recently Viewed
          </button>
        </div>

        {/* Product Grid */}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((item) => (
            <div class="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 group">
              <div class="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden group-hover:from-gray-200 group-hover:to-gray-300 transition-all duration-300">
                <div class="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span class="text-gray-500 font-medium z-10">Product Image</span>
              </div>
              <h4 class="font-semibold text-gray-900 mb-1 text-lg">Thrifting</h4>
              <p class="text-sm text-gray-600 mb-3">Polo T-shirt Women - Ivory</p>
              <div class="flex items-center justify-between">
                <p class="font-bold text-gray-900 text-lg">Rp. 129.000</p>
                <button class="p-2 rounded-full bg-gray-100 hover:bg-purple-100 transition-colors group-hover:bg-purple-50">
                  <svg class="w-4 h-4 text-purple-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div class="text-center mt-6">
          <A href="/wishlist" class="inline-block px-8 py-3 border-2 border-gray-900 text-gray-900 font-medium rounded-lg hover:bg-gray-900 hover:text-white transition-colors">
            See All
          </A>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
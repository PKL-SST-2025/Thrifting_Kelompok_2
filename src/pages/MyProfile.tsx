import { createSignal, Show } from 'solid-js';
import { A } from '@solidjs/router';

const MyProfile = () => {
  const [isEditing, setIsEditing] = createSignal(false);
  const [userInfo, setUserInfo] = createSignal({
    username: 'Hi, Conrad',
    email: 'conrad@example.com',
    bio: 'Passionate thrift shopper and sustainable fashion enthusiast',
    location: 'Jakarta, Indonesia'
  });

  const handleEditProfile = () => {
    setIsEditing(!isEditing());
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    // Add save logic here
  };

  const updateUserInfo = (field: string, value: string) => {
    setUserInfo(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div class="bg-white rounded-lg shadow-sm p-8">
      <h2 class="text-2xl font-bold text-gray-900 mb-6">My Profile</h2>
      
      {/* Profile Header */}
      <div class="bg-gray-200 rounded-lg p-8 mb-6 relative">
        <div class="flex items-center space-x-6">
          {/* Profile Image */}
          <div class="relative">
            <div class="w-24 h-24 bg-gray-400 rounded-full flex items-center justify-center">
              <span class="text-white text-2xl font-bold">C</span>
            </div>
            <Show when={isEditing()}>
              <button class="absolute -bottom-2 -right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </button>
            </Show>
          </div>

          {/* Username */}
          <div class="flex-1">
            <Show
              when={isEditing()}
              fallback={<h3 class="text-2xl font-bold text-gray-900">{userInfo().username}</h3>}
            >
              <input
                type="text"
                value={userInfo().username}
                onInput={(e) => updateUserInfo('username', e.currentTarget.value)}
                class="text-2xl font-bold text-gray-900 bg-transparent border-b-2 border-gray-400 focus:border-red-500 focus:outline-none"
              />
            </Show>
          </div>

          {/* Edit Button */}
          <button
            onClick={isEditing() ? handleSaveProfile : handleEditProfile}
            class={`px-6 py-2 rounded-lg font-medium transition-colors ${
              isEditing()
                ? 'bg-green-500 text-white hover:bg-green-600'
                : 'bg-red-500 text-white hover:bg-red-600'
            }`}
          >
            {isEditing() ? 'Save Profile' : 'Edit Profile'}
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
              class="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
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
              class="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
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
              class="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
            />
          </Show>
        </div>
      </div>

      {/* Wishlist and Recently Viewed */}
      <div class="mt-8">
        <div class="flex space-x-8 mb-6">
          <button class="text-lg font-semibold text-gray-900 border-b-2 border-red-500 pb-2">
            Wishlist
          </button>
          <button class="text-lg font-medium text-gray-500 pb-2 hover:text-gray-700">
            Recently Viewed
          </button>
        </div>

        {/* Product Grid */}
        <div class="grid grid-cols-3 gap-6">
          {[1, 2, 3].map((item) => (
            <div class="bg-gray-100 rounded-lg p-4">
              <div class="aspect-square bg-gray-200 rounded-lg mb-4"></div>
              <h4 class="font-medium text-gray-900 mb-1">Thrifting</h4>
              <p class="text-sm text-gray-600 mb-2">Polo T-shirt Women - Ivory</p>
              <p class="font-semibold text-gray-900">Rp. 129.000,00</p>
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
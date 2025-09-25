import { Component, createSignal, onMount } from "solid-js";
import { useParams } from "@solidjs/router";
import ProductNavbar from "../components/ProductNavbar";
import { getProduct, addToWishlist, removeFromWishlist, isAuthenticated, type Product } from "../lib/api";

const ProductView: Component = () => {
  const params = useParams();
  const [selectedImage, setSelectedImage] = createSignal(0);
  const [selectedSize, setSelectedSize] = createSignal("all size");
  const [quantity, setQuantity] = createSignal(1);
  const [activeTab, setActiveTab] = createSignal("description"); // Add tab state
  
  // API product data
  const [product, setProduct] = createSignal<Product | null>(null);
  const [loading, setLoading] = createSignal(true);
  const [isLiked, setIsLiked] = createSignal(false);

  // Load product on mount
  onMount(async () => {
    if (params.id) {
      try {
        const fetchedProduct = await getProduct(parseInt(params.id));
        setProduct(fetchedProduct);
      } catch (err) {
        console.error("Failed to load product:", err);
      } finally {
        setLoading(false);
      }
    }
  });

  // Mock product data fallback - in a real app this would come from props or API
  const fallbackProduct = {
    brand: "THRIFTING",
    name: "Sweater Nike - White",
    price: "Rp. 190.000,00",
    rating: 5,
    colors: ["White", "Gray"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    images: [
      "/api/placeholder/400/500", // Main product image
      "/api/placeholder/400/500", // Additional images would go here
      "/api/placeholder/400/500",
      "/api/placeholder/400/500"
    ],
    description: "Elevate your everyday look with the Nike Sweater, a perfect blend of comfort and style. Designed with iconic Nike branding, this sweater is a versatile piece that works for both relaxed and active days.",
    features: [
      "Features: Soft, comfortable fit that's perfect for layering. Ideal for chilly mornings or as a relaxed outerwear piece."
    ],
    seller: {
      name: "Toko Thrift Jakarta",
      whatsapp: "+6282138448982",
      telegram: "@deettoll"
    }
  };

  // Mock reviews data
  const reviews = {
    overall: 9,
    totalReviews: 814,
    distribution: {
      5: 85,
      4: 10,
      3: 3,
      2: 1,
      1: 1
    },
    comments: [
      {
        name: "Jarwo",
        rating: 5,
        comment: "Bagus",
        avatar: "J"
      }
    ]
  };

  const incrementQuantity = () => setQuantity(quantity() + 1);
  const decrementQuantity = () => {
    if (quantity() > 1) setQuantity(quantity() - 1);
  };

  const handleChatSeller = (platform: 'whatsapp' | 'telegram') => {
    const currentProduct = product() || fallbackProduct;
    const productInfo = `Halo! Saya tertarik dengan produk:
    
Nama Produk: ${currentProduct.name}
Harga: ${typeof currentProduct.price === 'number' ? formatPrice(currentProduct.price) : currentProduct.price}
Ukuran: ${selectedSize()}
Jumlah: ${quantity()}

Apakah produk ini masih tersedia?`;

    if (platform === 'whatsapp') {
      const encodedMessage = encodeURIComponent(productInfo);
      const whatsappUrl = `https://wa.me/${(currentProduct as any).seller?.whatsapp?.replace(/[^0-9]/g, '') || '6282138448982'}?text=${encodedMessage}`;
      window.open(whatsappUrl, '_blank');
    } else if (platform === 'telegram') {
      const encodedMessage = encodeURIComponent(productInfo);
      const telegramUrl = `https://t.me/${(currentProduct as any).seller?.telegram?.replace('@', '') || 'deettoll'}?text=${encodedMessage}`;
      window.open(telegramUrl, '_blank');
    }
  };

  // Price formatter
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(price);
  };

  // Wishlist functionality
  const handleToggleWishlist = async () => {
    if (!isAuthenticated()) {
      alert("Please login to add items to wishlist");
      return;
    }

    const productId = product()?.id;
    if (!productId) return;

    try {
      if (isLiked()) {
        await removeFromWishlist(productId);
        setIsLiked(false);
      } else {
        await addToWishlist(productId);
        setIsLiked(true);
      }
    } catch (err) {
      console.error("Failed to toggle wishlist:", err);
      alert("Failed to update wishlist. Please try again.");
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg 
        class={`h-4 w-4 ${i < rating ? 'text-purple-500' : 'text-gray-300'}`} 
        fill="currentColor" 
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  // Helper to get current product data
  const currentProduct = () => product() || fallbackProduct;

  if (loading()) {
    return (
      <div class="min-h-screen bg-white">
        <ProductNavbar />
        <div class="flex justify-center items-center py-20">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div class="min-h-screen bg-white">
      <ProductNavbar />
      
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div class="space-y-4">
            {/* Main Image */}
            <div class="aspect-square bg-gray-200 rounded-lg overflow-hidden">
              <img 
                src={(currentProduct() as any).images?.[selectedImage()] || "/api/placeholder/400/500"} 
                alt={product.name}
                class="w-full h-full object-cover"
              />
            </div>
            
            {/* Thumbnail Images */}
            <div class="grid grid-cols-4 gap-2">
              {((currentProduct() as any).images || ["/api/placeholder/400/500"]).map((image, index) => (
                <button
                  onClick={() => setSelectedImage(index)}
                  class={`aspect-square bg-gray-200 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage() === index ? 'border-gray-900' : 'border-transparent'
                  }`}
                >
                  <img 
                    src={image} 
                    alt={`${product.name} view ${index + 1}`}
                    class="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Information */}
          <div class="space-y-6">
            {/* Brand and Title */}
            <div>
              <p class="text-sm font-medium text-gray-600 uppercase tracking-wide">{(currentProduct() as any).brand || 'THRIFTING'}</p>
              <h1 class="text-2xl font-bold text-gray-900 mt-1">{currentProduct().name}</h1>
            </div>

            {/* Rating */}
            <div class="flex items-center space-x-2">
              <div class="flex items-center">
                {renderStars((currentProduct() as any).rating || 5)}
              </div>
              <span class="text-sm text-gray-600">({(currentProduct() as any).rating || 5})</span>
            </div>

            {/* Price */}
            <div>
              <p class="text-3xl font-bold text-gray-900">{typeof currentProduct().price === 'number' ? formatPrice(currentProduct().price as number) : currentProduct().price}</p>
            </div>

            {/* Color Selection */}
            <div>
              <label class="block text-sm font-medium text-gray-900 mb-3">
                Colour: <span class="font-normal">{(currentProduct() as any).colors?.[0] || 'Default'}</span>
              </label>
              <div class="flex space-x-2">
                <button class="w-8 h-8 bg-white border-2 border-gray-900 rounded-full"></button>
                <button class="w-8 h-8 bg-gray-300 border-2 border-gray-300 rounded-full"></button>
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <label class="block text-sm font-medium text-gray-900 mb-3">
                Size: <span class="font-normal">Choose your size</span>
              </label>
              <select 
                value={selectedSize()}
                onChange={(e) => setSelectedSize(e.target.value)}
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                <option value="all size">all size</option>
                {((currentProduct() as any).sizes || ["S", "M", "L", "XL"]).map(size => (
                  <option value={size}>{size}</option>
                ))}
              </select>
            </div>

            {/* Quantity */}
            <div>
              <label class="block text-sm font-medium text-gray-900 mb-3">Quantity</label>
              <div class="flex items-center space-x-3">
                <button 
                  onClick={decrementQuantity}
                  class="w-10 h-10 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-50"
                >
                  -
                </button>
                <span class="text-lg font-medium w-8 text-center">{quantity()}</span>
                <button 
                  onClick={incrementQuantity}
                  class="w-10 h-10 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-50"
                >
                  +
                </button>
              </div>
              <p class="text-sm text-gray-500 mt-1">Stock available</p>
            </div>

            {/* Action Buttons */}
            <div class="space-y-4">
              {/* Chat Buttons */}
              <div class="flex space-x-3">
                <button 
                  onClick={() => handleChatSeller('whatsapp')}
                  class="flex-1 bg-green-600 text-white py-3 px-6 rounded-md hover:bg-green-700 transition-colors font-medium flex items-center justify-center space-x-2"
                >
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                  <span>Chat WhatsApp</span>
                </button>
                <button 
                  onClick={() => handleChatSeller('telegram')}
                  class="flex-1 bg-blue-500 text-white py-3 px-6 rounded-md hover:bg-blue-600 transition-colors font-medium flex items-center justify-center space-x-2"
                >
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                  </svg>
                  <span>Chat Telegram</span>
                </button>
              </div>
              
              {/* Secondary Actions */}
              <div class="flex space-x-4">
                <button 
                  onClick={handleToggleWishlist}
                  class={`flex-1 p-3 border rounded-md transition-colors flex items-center justify-center space-x-2 ${
                    isLiked() 
                      ? 'bg-red-50 border-red-300 text-red-700 hover:bg-red-100' 
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <svg class={`h-5 w-5 ${isLiked() ? 'fill-current text-red-600' : ''}`} fill={isLiked() ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                    <path 
                      stroke-linecap="round" 
                      stroke-linejoin="round" 
                      stroke-width="2" 
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  <span>{isLiked() ? 'Remove from Wishlist' : 'Add to Wishlist'}</span>
                </button>
                <button class="flex-1 p-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2">
                  <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path 
                      stroke-linecap="round" 
                      stroke-linejoin="round" 
                      stroke-width="2" 
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  <span class="text-sm">Wishlist</span>
                </button>
                <button class="flex-1 p-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2">
                  <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path 
                      stroke-linecap="round" 
                      stroke-linejoin="round" 
                      stroke-width="2" 
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                    />
                  </svg>
                  <span class="text-sm">Share</span>
                </button>
              </div>
              
              {/* Seller Info */}
              <div class="bg-gray-50 p-4 rounded-lg">
                <h3 class="font-medium text-gray-900 mb-2">Informasi Penjual</h3>
                <p class="text-sm text-gray-600">{(currentProduct() as any).seller?.name || "Toko Thrift Jakarta"}</p>
                <div class="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                  <span class="inline-flex items-center gap-1">
                    <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79a15.91 15.91 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24 12.36 12.36 0 003.88.62 1 1 0 011 1V20a2 2 0 01-2 2A18 18 0 013 7a2 2 0 012-2h2.5a1 1 0 011 1 12.36 12.36 0 00.62 3.88 1 1 0 01-.24 1.03l-2.26 2.26z"/></svg>
                    {(currentProduct() as any).seller?.whatsapp || "+6282138448982"}
                  </span>
                  <span class="inline-flex items-center gap-1">
                    <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 1010 10A10.011 10.011 0 0012 2zm4.94 7.34l-1.51 7.1a1 1 0 01-1.56.62l-2.25-1.66-1.08 1.04a1 1 0 01-1.69-.55l-.56-2.86-2.58-1.06a1 1 0 01.12-1.89l11-3.84a1 1 0 011.41 1.1z"/></svg>
                    {(currentProduct() as any).seller?.telegram || "@deettoll"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div class="mt-16">
          <div class="border-b border-gray-200">
            <nav class="flex space-x-8">
              <button 
                onClick={() => setActiveTab("description")}
                class={`border-b-2 pb-4 text-sm font-medium transition-colors ${
                  activeTab() === "description" 
                    ? "border-gray-900 text-gray-900" 
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                Description
              </button>
              <button 
                onClick={() => setActiveTab("reviews")}
                class={`border-b-2 pb-4 text-sm font-medium transition-colors ${
                  activeTab() === "reviews" 
                    ? "border-gray-900 text-gray-900" 
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                Reviews ({reviews.totalReviews})
              </button>
            </nav>
          </div>
          
          <div class="py-8">
            {activeTab() === "description" ? (
              <div class="max-w-3xl">
                <p class="text-gray-700 mb-4">{currentProduct().description}</p>
                <ul class="list-disc list-inside text-gray-700">
                  {((currentProduct() as any).features || []).map(feature => (
                    <li>{feature}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <div class="max-w-4xl mx-auto">
                {/* Reviews Content */}
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 justify-center">
                  {/* Left Side - Overall Rating */}
                  <div class="text-center">
                    <div class="mb-6">
                      <div class="text-6xl font-bold text-gray-900 mb-2">{reviews.overall}</div>
                      <div class="flex justify-center items-center mb-2">
                        {renderStars(5)}
                      </div>
                      <div class="text-sm text-gray-600">({reviews.totalReviews} Reviews)</div>
                    </div>

                    {/* Rating Distribution */}
                    <div class="space-y-2 max-w-sm mx-auto">
                      {[5, 4, 3, 2, 1].map(star => (
                        <div class="flex items-center space-x-2">
                          <span class="text-sm text-gray-600 w-6">{star} star</span>
                          <div class="flex-1 bg-gray-200 rounded-full h-2">
                            <div 
                              class="bg-purple-500 h-2 rounded-full" 
                              style={`width: ${reviews.distribution[star]}%`}
                            ></div>
                          </div>
                          <span class="text-sm text-gray-600 w-8">{reviews.distribution[star]}%</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Side - Additional Info */}
                  <div class="text-center">
                    <h3 class="text-lg font-medium text-gray-900 mb-4">Additional Information</h3>
                    <div class="space-y-4">
                      <div>
                        <h4 class="font-medium text-gray-900">Size</h4>
                        <p class="text-gray-600">S, M, L, XL, XXL</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Individual Reviews */}
                <div class="mt-8 border-t border-gray-200 pt-6 max-w-2xl mx-auto">
                  {reviews.comments.map((review, index) => (
                    <div class="flex flex-col items-center space-y-3 mb-6 lg:flex-row lg:space-y-0 lg:space-x-4 lg:justify-center">
                      <div class="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                        <span class="text-gray-600 font-medium">{review.avatar}</span>
                      </div>
                      <div class="text-center lg:text-center">
                        <div class="flex items-center justify-center space-x-2 mb-1">
                          <h4 class="font-medium text-gray-900">{review.name}</h4>
                          <div class="flex items-center">
                            {renderStars(review.rating)}
                          </div>
                        </div>
                        <p class="text-gray-700">{review.comment}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* You may also like */}
        <div class="mt-16">
          <h2 class="text-2xl font-bold text-gray-900 mb-8">You may also like</h2>
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {/* Placeholder for related products */}
            {Array.from({ length: 5 }, (_, i) => (
              <div class="bg-gray-200 aspect-square rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductView;

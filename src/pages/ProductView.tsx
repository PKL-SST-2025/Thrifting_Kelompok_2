import { Component, createSignal } from "solid-js";
import ProductNavbar from "../components/ProductNavbar";

const ProductView: Component = () => {
  const [selectedImage, setSelectedImage] = createSignal(0);
  const [selectedSize, setSelectedSize] = createSignal("all size");
  const [quantity, setQuantity] = createSignal(1);
  const [activeTab, setActiveTab] = createSignal("description"); // Add tab state

  // Mock product data - in a real app this would come from props or API
  const product = {
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
    ]
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

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg 
        class={`h-4 w-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`} 
        fill="currentColor" 
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

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
                src={product.images[selectedImage()]} 
                alt={product.name}
                class="w-full h-full object-cover"
              />
            </div>
            
            {/* Thumbnail Images */}
            <div class="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
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
              <p class="text-sm font-medium text-gray-600 uppercase tracking-wide">{product.brand}</p>
              <h1 class="text-2xl font-bold text-gray-900 mt-1">{product.name}</h1>
            </div>

            {/* Rating */}
            <div class="flex items-center space-x-2">
              <div class="flex items-center">
                {renderStars(product.rating)}
              </div>
              <span class="text-sm text-gray-600">({product.rating})</span>
            </div>

            {/* Price */}
            <div>
              <p class="text-3xl font-bold text-gray-900">{product.price}</p>
            </div>

            {/* Color Selection */}
            <div>
              <label class="block text-sm font-medium text-gray-900 mb-3">
                Colour: <span class="font-normal">{product.colors[0]}</span>
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
                {product.sizes.map(size => (
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
            <div class="flex space-x-4">
              <button class="flex-1 bg-gray-900 text-white py-3 px-6 rounded-md hover:bg-gray-800 transition-colors font-medium">
                Add to Cart
              </button>
              <button class="p-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path 
                    stroke-linecap="round" 
                    stroke-linejoin="round" 
                    stroke-width="2" 
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
              <button class="p-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path 
                    stroke-linecap="round" 
                    stroke-linejoin="round" 
                    stroke-width="2" 
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                  />
                </svg>
              </button>
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
                <p class="text-gray-700 mb-4">{product.description}</p>
                <ul class="list-disc list-inside text-gray-700">
                  {product.features.map(feature => (
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
                              class="bg-yellow-400 h-2 rounded-full" 
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

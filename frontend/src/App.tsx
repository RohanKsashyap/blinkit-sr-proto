import  { useState } from 'react';
import { Search, ShoppingCart, ChevronDown, Clock3, User, Heart, MapPin, Phone } from 'lucide-react';
import ProductCard from './components/ProductCard';
import CategoryCard from './components/CategoryCard';
import Cart from './components/Cart';
import AuthModal from './components/AuthModal';

function App() {
  const [location, setLocation] = useState('Select Location');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cart, setCart] = useState<Array<{ id: number; quantity: number }>>([]);
  
  const categories = [
    { name: 'Fruits & Vegetables', image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&q=80&w=300&h=300' },
    { name: 'Dairy & Breakfast', image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&q=80&w=300&h=300' },
    { name: 'Snacks & Munchies', image: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?auto=format&fit=crop&q=80&w=300&h=300' },
    { name: 'Beverages', image: 'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?auto=format&fit=crop&q=80&w=300&h=300' },
    { name: 'Instant Food', image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&q=80&w=300&h=300' },
    { name: 'Sweet Cravings', image: 'https://images.unsplash.com/photo-1587244141530-6b594e3e3917?auto=format&fit=crop&q=80&w=300&h=300' },
    { name: 'Cleaning Essentials', image: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&q=80&w=300&h=300' },
    { name: 'Personal Care', image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=300&h=300' },
  ];

  const products = [
    { 
      id: 1, 
      name: 'Fresh Tomatoes', 
      price: 2.99, 
      unit: '500g', 
      image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=300&h=300',
      description: 'Fresh, ripe tomatoes perfect for salads and cooking',
      discount: 10,
      inStock: true
    },
    { 
      id: 2, 
      name: 'Organic Bananas', 
      price: 3.49, 
      unit: '1kg', 
      image: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?auto=format&fit=crop&q=80&w=300&h=300',
      description: 'Sweet and nutritious organic bananas',
      discount: 0,
      inStock: true
    },
    { 
      id: 3, 
      name: 'Fresh Milk', 
      price: 4.99, 
      unit: '1L', 
      image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&q=80&w=300&h=300',
      description: 'Farm fresh whole milk',
      discount: 15,
      inStock: true
    },
    { 
      id: 4, 
      name: 'Bread', 
      price: 2.49, 
      unit: '400g', 
      image: 'https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?auto=format&fit=crop&q=80&w=300&h=300',
      description: 'Freshly baked whole wheat bread',
      discount: 0,
      inStock: false
    },
  ];

  const handleAddToCart = (productId: number) => {
    if (!isLoggedIn) {
      setIsAuthOpen(true);
      return;
    }

    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === productId);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { id: productId, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity === 0) {
      setCart(prevCart => prevCart.filter(item => item.id !== productId));
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => {
    const product = products.find(p => p.id === item.id);
    if (!product) return sum;
    const price = product.price * (1 - product.discount / 100);
    return sum + price * item.quantity;
  }, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-green-500 text-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-bold">QuickMart</h1>
              <button 
                className="flex items-center space-x-2 bg-white text-gray-800 px-4 py-2 rounded-lg"
                onClick={() => setLocation(prompt('Enter your location') || location)}
              >
                <MapPin size={20} />
                <span>{location}</span>
                <ChevronDown size={20} />
              </button>
            </div>
            <div className="flex items-center space-x-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for products..."
                  className="w-96 px-4 py-2 rounded-lg text-gray-800 focus:outline-none"
                />
                <Search className="absolute right-3 top-2.5 text-gray-400" size={20} />
              </div>
              <button 
                className="flex items-center space-x-2"
                onClick={() => isLoggedIn ? setIsCartOpen(true) : setIsAuthOpen(true)}
              >
                <div className="relative">
                  <ShoppingCart size={24} />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {cartItemCount}
                    </span>
                  )}
                </div>
                <span>Cart</span>
                {cartTotal > 0 && (
                  <span className="font-semibold">${cartTotal.toFixed(2)}</span>
                )}
              </button>
              <button 
                className="flex items-center space-x-2"
                onClick={() => setIsAuthOpen(true)}
              >
                <User size={24} />
                <span>{isLoggedIn ? 'Account' : 'Sign up'}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Delivery Time Banner */}
      <div className="bg-white border-b sticky top-16 z-40">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-gray-600">
              <Clock3 size={20} />
              <span>Delivery in 10-15 minutes</span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 text-gray-600">
                <Heart size={20} />
                <span>Wishlist</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-600">
                <Phone size={20} />
                <span>Contact Support</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Categories */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <CategoryCard key={index} {...category} />
            ))}
          </div>
        </section>

        {/* Products */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Popular Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {products.map(product => (
              <ProductCard 
                key={product.id} 
                {...product} 
                onAddToCart={() => handleAddToCart(product.id)}
                quantity={cart.find(item => item.id === product.id)?.quantity || 0}
                onUpdateQuantity={(quantity) => handleUpdateQuantity(product.id, quantity)}
              />
            ))}
          </div>
        </section>
      </main>

      {/* Cart Sidebar */}
      <Cart 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        products={products}
        onUpdateQuantity={handleUpdateQuantity}
      />

      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLogin={() => {
          setIsLoggedIn(true);
          setIsAuthOpen(false);
        }}
      />
    </div>
  );
}

export default App;
import React from 'react';
import { X, Minus, Plus } from 'lucide-react';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: Array<{ id: number; quantity: number }>;
  products: Array<{
    id: number;
    name: string;
    price: number;
    unit: string;
    image: string;
    discount: number;
  }>;
  onUpdateQuantity: (productId: number, quantity: number) => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose, items, products, onUpdateQuantity }) => {
  const cartTotal = items.reduce((sum, item) => {
    const product = products.find(p => p.id === item.id);
    if (!product) return sum;
    const price = product.price * (1 - product.discount / 100);
    return sum + price * item.quantity;
  }, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-96 bg-white shadow-xl">
        <div className="flex flex-col h-full">
          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Your Cart</h2>
              <button onClick={onClose}>
                <X size={24} />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {items.length === 0 ? (
              <div className="text-center text-gray-500 mt-8">
                Your cart is empty
              </div>
            ) : (
              <div className="space-y-4">
                {items.map(item => {
                  const product = products.find(p => p.id === item.id);
                  if (!product) return null;
                  const price = product.price * (1 - product.discount / 100);

                  return (
                    <div key={item.id} className="flex items-center space-x-4">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium">{product.name}</h3>
                        <p className="text-sm text-gray-500">{product.unit}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="font-semibold">${(price * item.quantity).toFixed(2)}</span>
                          <div className="flex items-center space-x-2">
                            <button 
                              className="bg-green-500 text-white w-8 h-8 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center"
                              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus size={16} />
                            </button>
                            <span className="font-medium w-8 text-center">{item.quantity}</span>
                            <button 
                              className="bg-green-500 text-white w-8 h-8 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center"
                              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="p-4 border-t">
            <div className="flex items-center justify-between mb-4">
              <span className="font-medium">Total</span>
              <span className="font-semibold text-xl">${cartTotal.toFixed(2)}</span>
            </div>
            <button 
              className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors font-medium"
              disabled={items.length === 0}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
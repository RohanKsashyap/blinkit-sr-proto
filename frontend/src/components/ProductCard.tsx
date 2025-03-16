import React from 'react';
import { Minus, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  unit: string;
  image: string;
  description: string;
  discount: number;
  inStock: boolean;
  quantity: number;
  onAddToCart: () => void;
  onUpdateQuantity: (quantity: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  name, 
  price, 
  unit, 
  image, 
  description, 
  discount,
  inStock,
  quantity,
  onAddToCart,
  onUpdateQuantity
}) => {
  const discountedPrice = price * (1 - discount / 100);

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
      <div className="relative">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
        {discount > 0 && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm">
            {discount}% OFF
          </div>
        )}
        {!inStock && (
          <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
            <span className="text-white font-medium">Out of Stock</span>
          </div>
        )}
      </div>
      <h3 className="font-medium text-gray-800 mb-1">{name}</h3>
      <p className="text-sm text-gray-500 mb-2">{description}</p>
      <p className="text-sm text-gray-500 mb-2">{unit}</p>
      <div className="flex items-center justify-between">
        <div>
          {discount > 0 ? (
            <div>
              <span className="font-semibold text-gray-900">${discountedPrice.toFixed(2)}</span>
              <span className="text-sm text-gray-500 line-through ml-2">${price.toFixed(2)}</span>
            </div>
          ) : (
            <span className="font-semibold text-gray-900">${price.toFixed(2)}</span>
          )}
        </div>
        {inStock && (
          quantity === 0 ? (
            <Link to={'/product/:id'}>
            <button 
              className="bg-green-500 text-white px-4 py-1 rounded-lg hover:bg-green-600 transition-colors"
              onClick={onAddToCart}
            >
              Add
            </button>
            </Link>
          ) : (
            <div className="flex items-center space-x-2">
              <button 
                className="bg-green-500 text-white w-8 h-8 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center"
                onClick={() => onUpdateQuantity(quantity - 1)}
              >
                <Minus size={16} />
              </button>
              <span className="font-medium w-8 text-center">{quantity}</span>
              <button 
                className="bg-green-500 text-white w-8 h-8 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center"
                onClick={() => onUpdateQuantity(quantity + 1)}
              >
                <Plus size={16} />
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ProductCard;
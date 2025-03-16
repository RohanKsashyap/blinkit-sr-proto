import React from "react";
import { products } from "../Pages/Home";





const SingleproductsPage: React.FC = () => {




    
  return (
    <div className="min-h-screen bg-green-50 flex justify-center items-center p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
        <h1 className="text-2xl font-semibold text-green-700">{products[0].name}</h1>
        <p className="text-xl text-gray-700 mt-2">${products[0].price.toFixed(2)}</p>
        <p className="text-gray-600 mt-4">{products[0].description}</p>

        <div className="mt-6 flex gap-4">
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition">
            Buy Now
          </button>
          <button className="bg-green-300 text-green-900 px-4 py-2 rounded-lg hover:bg-green-400 transition">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleproductsPage;

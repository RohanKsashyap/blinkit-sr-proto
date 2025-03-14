import React from 'react';

interface CategoryCardProps {
  name: string;
  image: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ name, image }) => {
  return (
    <div className="relative group cursor-pointer">
      <div className="overflow-hidden rounded-lg">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-lg flex items-end">
        <h3 className="text-white font-medium p-4 w-full">{name}</h3>
      </div>
    </div>
  );
};

export default CategoryCard;
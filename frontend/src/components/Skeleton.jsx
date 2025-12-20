import React from 'react';

const Skeleton = ({ type = 'text', className = '' }) => {
  const baseClasses = 'skeleton';
  
  const typeClasses = {
    text: 'skeleton-text',
    textLg: 'skeleton-text-lg',
    image: 'skeleton-image',
    button: 'skeleton-button',
    card: 'skeleton rounded-lg h-64',
    circle: 'skeleton rounded-full w-16 h-16'
  };
  
  return (
    <div className={`${baseClasses} ${typeClasses[type] || typeClasses.text} ${className}`}></div>
  );
};

export const ProductSkeleton = () => (
  <div className="responsive-card flex flex-col h-full">
    <div className="h-48 overflow-hidden">
      <Skeleton type="image" />
    </div>
    <div className="p-4 flex-grow flex flex-col">
      <div className="flex-grow">
        <Skeleton type="textLg" className="mb-2" />
        <Skeleton type="text" className="mb-4" />
        <div className="mt-2">
          <Skeleton type="text" className="w-1/3" />
        </div>
      </div>
      <div className="mt-4">
        <Skeleton type="button" />
      </div>
    </div>
  </div>
);

export const ProductDetailSkeleton = () => (
  <div className="responsive-product-detail">
    <div className="flex flex-col">
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4">
        <Skeleton type="image" className="product-detail-image" />
      </div>
      <div className="grid grid-cols-4 gap-2">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} type="image" className="h-24" />
        ))}
      </div>
    </div>
    
    <div>
      <Skeleton type="textLg" className="mb-4" />
      <Skeleton type="text" className="mb-2" />
      <Skeleton type="text" className="mb-6 w-3/4" />
      
      <div className="mb-6">
        <Skeleton type="text" className="mb-2" />
        <Skeleton type="text" className="w-1/2" />
      </div>
      
      <div className="mb-6">
        <Skeleton type="text" className="mb-2" />
        <Skeleton type="button" className="w-32" />
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Skeleton type="button" />
        <Skeleton type="button" />
      </div>
    </div>
  </div>
);

export const CartItemSkeleton = () => (
  <div className="flex items-center p-6 border-b border-gray-200 last:border-b-0">
    <div className="flex-shrink-0 w-24 h-24">
      <Skeleton type="image" />
    </div>
    
    <div className="ml-6 flex-grow">
      <Skeleton type="textLg" className="mb-2" />
      <Skeleton type="text" className="w-1/3" />
      
      <div className="mt-4 flex items-center">
        <Skeleton type="text" className="w-24" />
        <div className="flex items-center ml-4">
          <Skeleton type="button" className="w-8 h-8" />
          <Skeleton type="button" className="w-12 h-8 mx-1" />
          <Skeleton type="button" className="w-8 h-8" />
        </div>
      </div>
    </div>
    
    <div className="flex flex-col items-end">
      <Skeleton type="text" className="mb-4" />
      <Skeleton type="button" className="w-20 h-8" />
    </div>
  </div>
);

export default Skeleton;
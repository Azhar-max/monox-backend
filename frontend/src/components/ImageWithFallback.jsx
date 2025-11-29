import React, { useState } from 'react';

const ImageWithFallback = ({ 
  src, 
  alt, 
  className = '', 
  fallbackSrc = null,
  ...props 
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Default fallback image
  const defaultFallback = '/logo.jpg';
  
  // Use provided fallback or default
  const fallbackImage = fallbackSrc || defaultFallback;

  // Ensure the src is correctly formatted
  // If it's a relative path starting with /assets, use the backend URL
  const formattedSrc = src && src.startsWith('/assets/') ? 
    `http://localhost:3002${src}` : 
    (src && src.startsWith('/') ? src : `/${src}`);

  return (
    <>
      {!imageLoaded && (
        <div className={`skeleton ${className}`} />
      )}
      <img
        src={imageError ? fallbackImage : formattedSrc}
        alt={alt}
        className={`${className} ${imageLoaded ? 'block' : 'hidden'}`}
        onLoad={() => setImageLoaded(true)}
        onError={() => setImageError(true)}
        {...props}
      />
    </>
  );
};

export default ImageWithFallback;
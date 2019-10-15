import React from 'react';
import Product from './Product';
import './Products.css';

const Products = ({ products, favorites, setFavoriteCallback }) => {
  return (
    <div className="Products-grid">
      {products.map(product => <Product
        key={product.variantId}
        product={product}
        isFavorite={favorites.includes(product.productId)} // Set isFavorite if this product is in the favorites
        setFavoriteCallback={setFavoriteCallback}
      />)}
    </div>
  );
};

export default Products;

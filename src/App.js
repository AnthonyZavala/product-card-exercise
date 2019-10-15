import React, { useState, useEffect } from 'react';
import './App.css';
import Products from './Products';
import Filters from './Filters';

const App = () => {
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);

  // Get userId from local storage, or set it to a new id.
  const userId = (window.localStorage.getItem('userId') || Date.now().toString());

  useEffect(() => {
    // Fetch user from API
    const fetchUser = fetch(`/users/${userId}`).then(response => response.json());

    // Fetch products from API
    const fetchProducts = fetch('/products').then(response => response.json());

    // Wait for both user and product data
    Promise.all([fetchUser, fetchProducts])
      .then(([user, products]) => {
        // If user does not exist post create user to API
        if (!user.id) {
          fetch(`/users/${userId}`, { method: 'POST' })
            .then(_ => window.localStorage.setItem('userId', userId));
        }

        setFavorites(user.favorites);

        // Move favorite products to the beginning of the array
        const favoriteProducts = products.filter(product => user.favorites.includes(product.productId));
        const nonFavoriteProducts = products.filter(product => !user.favorites.includes(product.productId));
        setProducts([...favoriteProducts, ...nonFavoriteProducts]);
      });
  }, [userId]);

  // Callback for posting add and remove favorite commands to API
  const setFavorite = (selected, product) => selected
    ? fetch(`/users/${userId}/addFavorite/${product.productId}`, { method: 'POST' })
    : fetch(`/users/${userId}/removeFavorite/${product.productId}`, { method: 'POST' });

  return (
    <div className="app">
      <div className="App-row">
        <Filters />
      </div>
      <div className="App-row">
        <Products products={products} favorites={favorites} setFavoriteCallback={setFavorite} />
      </div>
    </div>
  )
};

export default App;

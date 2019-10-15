const express = require('express');
const products = require('../products.json');
const { GetUser, GetUserFavorites, CreateUser, AddFavorite, RemoveFavorite } = require('./user/userService');

const app = express();
const port = process.env.PORT || 9001;

// Get all products
app.get('/products', (req, res) => {
  return res.json(products);
});

// Get projected user
app.get('/users/:userId', (req, res) => {
  return res.json(GetUser(req.params.userId));
});

// Get projected user favorites
app.get('/users/:userId/favorites', (req, res) => {
  return res.json(GetUserFavorites(req.params.userId));
});

// Create user
app.post('/users/:userId', (req, res) => {
  return evaluateCommandResult(
    CreateUser(req.params.userId), res);
});

// Add favorite to user
app.post('/users/:userId/addFavorite/:productId', (req, res) => {
  return evaluateCommandResult(
    AddFavorite(req.params.userId, req.params.productId), res);
});

// Remove favorite from user
app.post('/users/:userId/removeFavorite/:productId', (req, res) => {
  return evaluateCommandResult(
    RemoveFavorite(req.params.userId, req.params.productId), res);
});

// If result exists, then bad request, else accepted
const evaluateCommandResult = (result, res) => result
  ? res.status(400).json(result)
  : res.sendStatus(202);

app.listen(port, () => console.info(`App started, listening on ${port}`));

const client = require('./index.js');
const express = require('express');
const app = express();

app.listen(3000, (err) => {
  if (err) {
    console.log('ERROR: ', err)

  } else {
    console.log('Listening at port 3000');
  }
})

app.get('/products', client.getProducts);
app.get('/products/:product_id', client.getProductsById);
app.get('/products/:product_id/styles', client.getProductsStylesById);
app.get('/products/:product_id/related', client.getRelated);
app.get('/cart', client.getCart);
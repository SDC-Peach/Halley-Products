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
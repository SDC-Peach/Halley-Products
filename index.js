var pg = require('pg');

const credentials = {
  user: "postgres",
  host: "localhost",
  database: "products",
  password: "atofay4808",
  port: 5432
};

var connection = new pg.Client(credentials);

connection.connect((err) => {
  if (err) {
    console.log('ERROR AT DATABASE: ', err);
    throw err;
  }
  console.log('Connected to Database!!');
});

module.exports = {connection};
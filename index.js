var pg = require('pg');
require('dotenv').config();

let credentials = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
};

var connection = new pg.Pool(credentials);

connection.connect((err) => {
  if (err) {
    console.log('ERROR AT DATABASE: ', err);
    throw err;
  }
  console.log('Connected to Database!!');
});

const getProducts = (req, res) => {
  connection.query(`SELECT * FROM product WHERE id >= ${req.query.page || 1} ORDER BY id ASC LIMIT ${req.query.count || 5}`, (err, results) => {
    if (err) {
      console.log('ERROR GETTING PRODUCTS: ', err);
      throw err;
    }
    res.status(200).send(results.rows)
  })
}

const getProductsById = (req, res) => {
  const id = req.params.product_id;

  connection.query(`
      SELECT id, name, slogan, description, category, default_price AS default_price, p.features
      FROM product,
      LATERAL (
        SELECT ARRAY (
          SELECT jsonb_build_object('feature', feature, 'value', value)
          FROM features
          WHERE product_id = product.id
        ) AS features
      ) p WHERE id = $1 `, [id], (err, results) => {
    if (err) {
      console.log('ERROR GETTING PRODUCT BY ID', err);
      throw err;
    }
    res.status(200).send(results.rows[0])
  })
}

const getProductsStylesById = (req, res) => {
  const id = req.params.product_id;

  let finalRes = {"product_id": id};

  connection.query(`SELECT id AS style_id, name, original_price, sale_price, default_style AS default, si.photos, so.skus FROM styles, LATERAL (
    SELECT ARRAY (
      SELECT jsonb_build_object('thumbnail_url', thumbnail_url, 'url', url)
      FROM photos
      WHERE "styleId" = styles.id
    ) AS photos
  ) si, LATERAL (
    SELECT ARRAY (
      SELECT jsonb_build_object(id, ('quantity', quantity, 'size', size))
      FROM skus
      WHERE "styleId" = styles.id
    ) AS skus
  ) so WHERE "productId" = $1`, [id], (err, results) => {
    if (err) {
      console.log('ERROR GETTING PRODUCT STYLES BY ID', err);
      throw err;
    }

    res.status(200).send({
      product_id: id,
      results: results.rows})
  })


}

const getRelated = (req, res) => {
  const id = req.params.product_id;

  connection.query('SELECT ARRAY (SELECT related_product_id FROM related WHERE "current_product_id" = $1)', [id], (err, results) => {
    if (err) {
      console.log('ERROR GETTING RELATED: ', err);
      throw err;
    }

    res.status(200).send(results.rows[0].array);
  })
}

const getCart = (req, res) => {
  connection.query('SELECT * FROM cart', (err, results) => {
    if (err) {
      console.log('ERROR GETTING CART: ', err);
      throw err;
    }

    res.status(200).send(results.rows);
  })
}

const addToCart = (req, res) => {
  console.log(req)
  // connection.query('INSERT INTO cart (user session, product_id, active VALUES')
}

module.exports = {
  connection,
  getProducts,
  getProductsById,
  getProductsStylesById,
  getRelated,
  getCart
};
const request = require("supertest");
const baseURL = "http://localhost:3000"

describe('testing postgres', () => {

  it('should get all products', async () => {
    const response = await request(baseURL).get("/products");
    expect(response.statusCode).toBe(200);
    expect(response.body.length === 5).toBe(true);
    expect(response.body[0].id).toBeTruthy();
    expect(response.body[0].name).toBeTruthy();
    expect(response.body[0].slogan).toBeTruthy();
    expect(response.body[0].description).toBeTruthy();
    expect(response.body[0].category).toBeTruthy();
    expect(response.body[0].default_price).toBeTruthy();
  })

  it('should get product information', async () => {
    const response = await request(baseURL).get("/products/1");
    expect(response.statusCode).toBe(200);
    expect(response.body.id).toBeTruthy();
    expect(response.body.name).toBeTruthy();
    expect(response.body.slogan).toBeTruthy();
    expect(response.body.description).toBeTruthy();
    expect(response.body.category).toBeTruthy();
    expect(response.body.default_price).toBeTruthy();
    expect(response.body.features).toBeTruthy();
  })

  it('should get styles', async () => {
    const response = await request(baseURL).get("/products/1/styles");
    expect(response.statusCode).toBe(200);
    expect(response.body.product_id).toBeTruthy();
    expect(response.body.results.length > 0).toBe(true);
    expect(response.body.results[0].style_id).toBeTruthy();
    expect(response.body.results[0].name).toBeTruthy();
    expect(response.body.results[0].original_price).toBeTruthy();
    expect(response.body.results[0].photos).toBeTruthy();
    expect(response.body.results[0].skus).toBeTruthy();
  })

  it('should get related', async () => {
    const response = await request(baseURL).get("/products/1/related");
    expect(response.statusCode).toBe(200);
    expect(response.body.length > 0).toBe(true);
  })
})
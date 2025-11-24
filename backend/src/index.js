import { config } from './config.js';
import { createServer } from './server.js';
import { runMigrations, seedProducts } from './db.js';
import { productSeed } from './data/products.js';

runMigrations();
seedProducts(productSeed);

const app = createServer();

app.listen(config.port, () => {
  console.log(`Sportify API listening on http://localhost:${config.port}`);
});


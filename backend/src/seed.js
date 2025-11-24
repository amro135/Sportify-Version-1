import { runMigrations, seedProducts } from './db.js';
import { productSeed } from './data/products.js';

runMigrations();
seedProducts(productSeed);

console.log('Database migrated and products ensured.');


# Sportify Backend

API server that powers the Sportify storefront. It exposes product, authentication, cart, and order endpoints that the existing frontend can consume.

## Quick Start

```bash
cd Sportify-Version-1/backend
cp env.example .env    # adjust values as needed
npm install
npm run dev
```

By default the server listens on `http://localhost:4000` and accepts CORS requests from `http://localhost:5500`. Update `.env` if your frontend runs elsewhere.

## Available Scripts

- `npm run dev` – start the API with live reload.
- `npm start` – start the API without the file watcher (use in production).
- `npm run seed` – run migrations and ensure the default products exist.

## Environment Variables

| Variable        | Description                                   | Default                |
|-----------------|-----------------------------------------------|------------------------|
| `PORT`          | Port for the HTTP server                      | `4000`                 |
| `CLIENT_ORIGIN` | Allowed CORS origin for the frontend          | `http://localhost:5500`|
| `JWT_SECRET`    | Secret used to sign auth tokens               | `change-me`            |
| `TAX_RATE`      | Decimal tax rate applied at checkout          | `0.07`                 |
| `SHIPPING_FLAT` | Flat shipping charge applied to any order     | `5.99`                 |

## API Overview

All endpoints live under `/api`. Authenticated routes expect the HTTP-only cookie issued by the login/register calls, but they also accept a `Bearer` token in the `Authorization` header if you prefer to store the JWT yourself.

### Auth

| Method | Path            | Description                         |
|--------|-----------------|-------------------------------------|
| POST   | `/auth/register`| Create account and receive a token  |
| POST   | `/auth/login`   | Login with email/password           |
| POST   | `/auth/logout`  | Clear the auth cookie               |
| GET    | `/auth/me`      | Fetch the authenticated profile     |

### Products

| Method | Path                 | Description                                    |
|--------|----------------------|------------------------------------------------|
| GET    | `/products`          | List products (filters: `category`, `search`)  |
| GET    | `/products/:slug`    | Retrieve a single product by slug              |
| GET    | `/products/categories` | Aggregated counts per category               |

### Cart (requires auth)

| Method | Path             | Description                                     |
|--------|------------------|-------------------------------------------------|
| GET    | `/cart`          | Fetch the current user's cart                   |
| POST   | `/cart`          | Add/update an item (`productSlug`, `size`, `qty`)|
| PATCH  | `/cart/:itemId`  | Change the quantity of an item                  |
| DELETE | `/cart/:itemId`  | Remove an item                                  |
| DELETE | `/cart`          | Empty the cart                                  |

### Orders

| Method | Path               | Description                                              |
|--------|--------------------|----------------------------------------------------------|
| POST   | `/orders`          | Place an order (auth optional)                           |
| GET    | `/orders`          | List the authenticated user's orders                    |
| GET    | `/orders/:number`  | Fetch a specific order (auth, must belong to the user)  |

The checkout endpoint expects the same fields the existing `checkout.html` form collects (`fullName`, `email`, `phone`, `address`, `city`, `zip`, `notes`, `paymentMethod`, `cardLast4`, and an `items` array of `{ productSlug, size, qty }`). The server recalculates totals, generates an order number, and clears the user's cart if they were logged in.

## Integrating the Frontend

- Replace local product constants/fake carts with `fetch` calls to the endpoints above.
- Persist logins by hitting `/api/auth/register` or `/api/auth/login` and letting the browser keep the HTTP-only cookie.
- Use `/api/cart` to keep the user's cart synced across devices instead of localStorage.
- On checkout submission, POST to `/api/orders` using the payload produced by the form; the API returns an order number and totals you can show in the confirmation sheet.

All product imagery paths match the current frontend assets (`images/...`). If you host the backend separately, ensure those images remain publicly reachable or serve them from a CDN/static bucket.


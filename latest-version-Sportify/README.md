# Sportify

A modern sport equipment & services e-commerce site.

## Tech Stack
- **Frontend**: Next.js (App Router), Tailwind CSS, TypeScript
- **Backend**: Node.js, Express, MongoDB, TypeScript

## Getting Started

### Prerequisites
- Node.js
- MongoDB (running locally or URI provided)

### Setup

1.  **Install Dependencies**
    ```bash
    # Client
    cd client
    npm install

    # Server
    cd ../server
    npm install
    ```

2.  **Environment Variables**
    - Check `server/.env` and adjust `MONGODB_URI` if needed.

3.  **Run Development Servers**

    **Backend:**
    ```bash
    cd server
    npm run dev
    ```
    (You need to add `"dev": "nodemon index.ts"` or `"ts-node index.ts"` to package.json scripts first, or run `npx ts-node index.ts`)

    **Frontend:**
    ```bash
    cd client
    npm run dev
    ```

4.  **Access**
    - Frontend: [http://localhost:3000](http://localhost:3000)
    - Backend API: [http://localhost:5000](http://localhost:5000)

# Paradise Nursery 🌿

A modern, full-stack e-commerce platform for a premium plant nursery. Built with performance, aesthetics, and scalability in mind.

## 🚀 Features

### for Customers
-   **Immersive UI**: Beautiful, animated interface with "Category-First" browsing.
-   **Dynamic Animations**: Custom leaf animations that react to cursor movement ("wind effect").
-   **Smart Filtering**: Filter products by category or search instantly.
-   **Cart System**: Persistent shopping cart with real-time updates.
-   **User Accounts**: Secure signup/login with profile management.

### for Admins
-   **Mobile-First Dashboard**: Manage your store from your phone.
-   **Easy Image Uploads**: Integrated **Cloudinary** support for direct camera/gallery uploads.
-   **Product Management**: Create, edit, and delete products with rich details.
-   **Category Management**: Organize plants into custom categories with images and descriptions.
-   **Order Tracking**: View and manage customer orders (Pending).

## 🛠️ Tech Stack

### Frontend (`/client`)
-   **Framework**: [Next.js 16](https://nextjs.org/) (App Router & Turbopack)
-   **Language**: TypeScript
-   **Styling**: Tailwind CSS v4
-   **Animations**: Framer Motion & GSAP
-   **Icons**: Lucide React
-   **State Management**: Zustand
-   **Image Optimization**: Next/Image + Cloudinary

### Backend (`/server`)
-   **Runtime**: Node.js & Express
-   **Language**: TypeScript
-   **Database**: PostgreSQL
-   **ORM**: Prisma
-   **Authentication**: JWT (JSON Web Tokens)
-   **Storage**: Cloudinary (for images)

## 📦 Project Structure

\`\`\`bash
├── client/                 # Next.js Frontend
│   ├── app/                # App Router Pages (Admin & User)
│   ├── components/         # Reusable UI Components
│   ├── lib/                # Utilities (API client, etc.)
│   └── store/              # Zustand Global State
│
├── server/                 # Express Backend
│   ├── prisma/             # Database Schema & Seeds
│   ├── src/
│   │   ├── routes/         # API Endpoints (Products, Auth, Categories)
│   │   └── index.ts        # Server Entry Point
\`\`\`

## 🚀 Getting Started

### Prerequisites
-   Node.js (v18+)
-   PostgreSQL Database
-   Cloudinary Account (Free)

### 1. Backend Setup

\`\`\`bash
cd server
npm install

# Configure Environment
# Create .env file with:
# DATABASE_URL="postgresql://user:password@localhost:5432/paradise_db"
# JWT_SECRET="your_super_secret_key"

# Initialize Database
npx prisma generate
npx prisma db push
npx prisma db seed  # Optional: Loads initial data

# Start Server
npm run dev
\`\`\`

### 2. Frontend Setup

\`\`\`bash
cd client
npm install

# Configure Environment
# Create .env.local file with:
# NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your_cloud_name"
# NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET="your_unsigned_preset"

# Start Client
npm run dev
\`\`\`

## 📸 Image Upload Setup (Cloudinary)
To enable the camera/gallery upload feature in the Admin panel:
1.  Create a free account on [Cloudinary](https://cloudinary.com/).
2.  Go to **Settings > Upload > Upload presets**.
3.  Add a new preset with **Mode: Unsigned**.
4.  Add the `Cloud Name` and `Preset Name` to your `client/.env.local`.

## 📸 Screenshots

\`\`\`carousel
![Home Page](assets/ui_home.png)
<!-- slide -->
![Curated Collections](assets/ui_collections.png)
<!-- slide -->
![Setup: Project Structure](assets/setup_structure.png)
<!-- slide -->
![Setup: Environment Config](assets/setup_db.png)
<!-- slide -->
![Setup: Cloudinary Config](assets/setup_cloudinary.png)
\`\`\`

---
Developed by [Gautam K Shah](https://github.com/gautamkshah)

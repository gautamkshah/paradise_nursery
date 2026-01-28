# Paradise Nursery 🌿

A modern, full-stack e-commerce platform for a premium plant nursery. Built with performance, aesthetics, and scalability in mind.

### ✨ Key Features

**For Customers**
-   **Immersive UI**: Beautiful, animated interface with "Category-First" browsing.
-   **Dynamic Animations**: Custom leaf animations that react to cursor movement.
-   **Smart Filtering**: Filter products by category or search instantly.
-   **Cart System**: Persistent shopping cart with real-time updates.
-   **User Accounts**: Secure signup/login with profile management.

**For Admins**
-   **Mobile-First Dashboard**: Manage your store from any device.
-   **Easy Image Uploads**: Integrated **Cloudinary** (Camera/Gallery support).
-   **Product & Category Management**: Full CRUD capabilities.
-   **Order Tracking**: View and manage customer orders.

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

**Install Dependencies**
\`\`\`bash
cd server
npm install
\`\`\`

**Configure Environment**
Create a \`.env\` file in the \`server/\` directory:
\`\`\`env
# Database Connection
DATABASE_URL="postgresql://user:password@localhost:5432/paradise_db"

# Security
JWT_SECRET="your_super_secret_key"
\`\`\`

**Start Server**
\`\`\`bash
# Initialize Database
npx prisma generate
npx prisma db push

# Run Service
npm run dev
\`\`\`

### 2. Frontend Setup

**Install Dependencies**
\`\`\`bash
cd client
npm install
\`\`\`

**Configure Environment**
Create a \`.env.local\` file in the \`client/\` directory:
\`\`\`env
# Cloudinary Keys (Get these from your Dashboard)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your_cloud_name"
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET="your_unsigned_preset"
\`\`\`

**Start Client**
\`\`\`bash
npm run dev
\`\`\`

## 📸 Image Upload Setup (Cloudinary)
To enable the camera/gallery upload feature in the Admin panel:
1.  Create a free account on [Cloudinary](https://cloudinary.com/).
2.  Go to **Settings > Upload > Upload presets**.
3.  Add a new preset with **Mode: Unsigned**.
4.  Add the `Cloud Name` and `Preset Name` to your `client/.env.local`.

## 📸 Website Preview

\`\`\`carousel
![Home Page](assets/ui_home.png)
<!-- slide -->
![Curated Collections](assets/ui_collections.png)
<!-- slide -->
![Admin Dashboard](assets/ui_admin.png)
<!-- slide -->
![Setup: Project Structure](assets/setup_structure.png)
<!-- slide -->
![Setup: Database Config](assets/setup_db.png)
<!-- slide -->
![Setup: Cloudinary Config](assets/setup_cloudinary.png)
\`\`\`

---
Developed by [Gautam K Shah](https://github.com/gautamkshah)

# Crestline Commerce x BILDIT CMS Integration

A modern, headless e-commerce storefront built with **Shopify Hydrogen** and integrated with the **BILDIT Visual Experience CMS**. 

This project demonstrates a fully functional Proof of Concept (POC) for a headless commerce homepage, blending dynamic Shopify catalog products with schedule-driven visual layouts managed via BILDIT.

---

## 🚀 Key Features

* **Shopify Hydrogen Stack:** Built using Shopify's official react-based headless framework (Remix, Vite, Tailwind/CSS).
* **Dynamic Product Catalog:** Integrates seamlessly with Shopify's product API endpoints to load real-time collections and cart operations.
* **BILDIT Headless CMS Integration:** Layout structures, visual banners, and promotional components are loaded dynamically from the CMS database based on schedule rules.
* **Premium Custom Storefront Components:**
  1. **Cinematic Hero:** A fullscreen promotional header featuring parallax background layers, action buttons, and animated scroll indicators.
  2. **Marquee Ticker:** An infinite-sliding, high-performance announcement bar for promotions and store alerts.
  3. **Split Category Banner:** Dual-column responsive promotional showcase (Men/Women categories) featuring hover-zoom zoom animations.
  4. **Full-Width Feature:** A wide, responsive promotional block designed for showcasing flagship collections.

---

## 🛠️ Tech Stack

* **Frontend Framework:** React 18, Remix (Hydrogen v2)
* **Build System:** Vite
* **Styling:** Custom Vanilla CSS for high-performance visual transitions
* **CMS Platform:** BILDIT Visual Experience Engine
* **Commerce Backend:** Shopify Storefront API

---

## 📦 Getting Started

### Prerequisites

* Node.js (v18 or higher recommended)
* npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Spectre03/CrestlineXBildit.git
   cd CrestlineXBildit
   ```

2. Install dependency packages:
   ```bash
   npm install
   ```

3. Start the local development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to the running port:
   👉 **`http://localhost:3001`** (or `http://localhost:3000` depending on port availability)

---

## ⚙️ Developer Sandbox Integration Details

For local development and sandbox evaluation, the storefront is configured as follows:
* **Catalog Data:** Connects to Shopify's public mock store API (`mock.shop`) for product data.
* **Layout Retrieval:** The storefront fetches published page configurations directly from the Firebase Realtime Database. This ensures high-performance retrieval and bypasses trial API-key gateway routing during local sandbox verification.
* **Live Editor Support:** The local dev server (`localhost:3001`) is whitelisted in BILDIT's dashboard host configurations to enable visual editor previews.

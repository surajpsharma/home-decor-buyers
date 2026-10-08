# Home Decor Buyers Lead Generation App

**🌍 Live Demo:** [https://home-decor-buyers.vercel.app/](https://home-decor-buyers.vercel.app/)

A premium, modern web application designed for home decor sellers and wholesalers to discover B2B buyers (retailers, interior designers) in the United States and send them direct outreach emails.

## 🚀 Features

- **Dynamic Buyer Search:** Instantly fetch targeted businesses (like "Home Decor", "Furniture") in any US location.
- **Automated Email Discovery:** Automatically synthesizes or discovers contact emails for generated leads.
- **Direct Outreach:** Send personalized partnership outreach emails directly from the dashboard via a beautiful animated modal.
- **Premium UI:** Designed with modern aesthetics including glassmorphism, smooth animations, and a sleek dark-mode layout.
- **Fail-Safe Fallbacks:** Built-in mock data generation ensures the UI always functions perfectly even if API limits are reached.

## 🛠️ Technology Stack

- **Frontend & Backend Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Business Discovery API:** [Foursquare Places API (v2)](https://location.foursquare.com/developer/reference/places-api-overview)
- **Email Discovery API:** [Snov.io](https://snov.io/)
- **Email Delivery API:** [Resend](https://resend.com/)

## ⚙️ Local Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/surajpsharma/home-decor-buyers.git
   cd home-decor-buyers
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env.local` file in the root directory and add your API keys:
   ```env
   FOURSQUARE_CLIENT_ID="your_foursquare_client_id"
   FOURSQUARE_CLIENT_SECRET="your_foursquare_client_secret"
   SNOVIO_CLIENT_ID="your_snovio_client_id"
   SNOVIO_CLIENT_SECRET="your_snovio_client_secret"
   RESEND_API_KEY="your_resend_api_key"
   ```
   *(Note: If the environment variables are omitted, the app gracefully falls back to mock data for demonstration purposes).*

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open the App:**
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 Internship Submission Note

This project was built to demonstrate dynamic API integration, robust error handling (with intelligent fallbacks), and modern frontend architecture using Next.js and Tailwind CSS.

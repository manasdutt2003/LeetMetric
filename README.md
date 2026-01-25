# LeetMetric

A premium LeetCode stats visualizer built with **Next.js 14**, **Tailwind CSS**, and **Framer Motion**.

![LeetMetric Preview](https://github.com/manasdutt2003/LeetMetric/raw/main/preview.png)

## Features

- 🔍 **Real-time Search**: Fetch user stats directly from LeetCode's GraphQL API.
- 🎨 **Premium UI**: Modern dark mode aesthetic, glassmorphism cards, and fluid animations.
- 📊 **Visual Stats**: Interactive circular progress rings for Easy, Medium, and Hard difficulty breakdown.
- ⚡ **Fast & Responsive**: Built on Next.js App Router with server-side API proxying.

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)

## API Reference

The app uses a local API route to proxy requests to LeetCode to avoid CORS issues.
- `POST /api/leetcode`: Expects `{ username: string }`.

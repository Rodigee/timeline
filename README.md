# Timeline History Trivia App

A timeline-based history trivia game.

## Overview

- Play the game at [timeline-lemon-rho.vercel.app](https://timeline-lemon-rho.vercel.app)
- Test your knowledge of historical events and their chronological order

## Tech Stack

- React
- Node.js
- Next.js
- Prisma
- Postgres (hosted by Supabase)
- Historical data is populated into database from Wikipedia API.

## Project Setup

This project was bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

### Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

### Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deployment

The app is hosted on Vercel, leveraging Next.js for optimal performance and ease of deployment.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Database

- Uses Postgres database hosted by Supabase
- Prisma ORM for database operations

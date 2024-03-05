# Address Explorer

Implementation of `CHALLENGE.md`. 

Surfaces a UI which allows users to display Nfts based on an input `address`. 
Implements 
Exposes simple pagination, and `orderBy` toggle, which requests for nfts based on transaction time, [_more_](https://docs.alchemy.com/reference/getnfts-sdk-v3)

This project uses [Next.js] (https://nextjs.org/docs/basic-features/font-optimization), [Shadcn UI](https://ui.shadcn.com/), and the [Alchemy SDK](https://www.alchemy.com/sdk) for fetching NFT related info, among many more dependencies.  

## Local setup

⚠️ Beforehand, please make sure to copy the `.env.example` file, and populate your own `.env.local` for local development, or `.env` with provided keys.  

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

Misc docs:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Shadcn UI](https://ui.shadcn.com/docs)

## Deploys on Vercel

This project demo has been deployed on Vercel, and is accessible at [https://address-explorer-liard.vercel.app/](https://address-explorer-liard.vercel.app/).

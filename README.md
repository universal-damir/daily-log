# Daily Log

A personal performance logging app with GitHub-style contribution calendar visualization. Track your daily performance across custom categories with a simple good/average/bad rating system.

## Features

- GitHub-style heatmap calendar visualization
- Multiple categories (relationship, work, workout, etc.)
- Good/Average/Bad rating system with colors
- Optional notes for each entry
- Combined and per-category calendar views
- User authentication via Supabase

## Tech Stack

- Bun (package manager)
- React 18 + Vite
- Tailwind CSS v4
- Supabase (auth + database)

## Setup

### 1. Install dependencies

```bash
bun install
```

### 2. Set up Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Go to SQL Editor and run the contents of `supabase-schema.sql`
3. Enable Email auth in Authentication > Providers

### 3. Configure environment

Copy `.env.example` to `.env` and fill in your Supabase credentials:

```bash
cp .env.example .env
```

Get your keys from Supabase Dashboard > Settings > API:
- `VITE_SUPABASE_URL` - Your project URL
- `VITE_SUPABASE_ANON_KEY` - Your anon/public key

### 4. Run the app

```bash
bun dev
```

## Deployment (Netlify)

1. Connect your repo to Netlify
2. Set build command: `bun run build`
3. Set publish directory: `dist`
4. Add environment variables in Netlify dashboard

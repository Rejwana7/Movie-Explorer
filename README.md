# Movie Explorer

A responsive movie and TV show discovery application built with React. Browse shows, search the TVMaze catalog by title, move through paginated results, and open a detailed view without leaving the page.

**Live site:** [movie-explorer-rho-topaz.vercel.app](https://movie-explorer-rho-topaz.vercel.app)

## Features

- Responsive landing page with a cinematic hero section
- Movie and TV show catalog powered by the TVMaze API
- Title search using a dedicated Search button or the Enter key
- Responsive card grid with poster, title, release year, rating, language, and genres
- Client-side pagination with 12 shows per page
- Details modal with summary, status, network, runtime, and other show information
- Loading, error, retry, empty-result, and missing-image states
- Shared responsive Navbar and Footer through a reusable layout
- Custom 404 page for unknown routes
- Vercel SPA rewrite support for direct route visits and refreshes

## Tech Stack

- React 19
- React Router 8
- Vite 8
- Tailwind CSS 4
- daisyUI 5
- TVMaze REST API
- ESLint
- Vercel

## Routes

| Path | Page | Description |
| --- | --- | --- |
| `/` | Home | Landing page with hero content and a link to explore shows |
| `/movies` | Movies | Searchable and paginated show catalog |
| `*` | Not Found | Friendly fallback for unknown URLs |

## How Search Works

The initial visit to the Movies page loads the TVMaze show index. Typing in the search field does not immediately make a request. A search is submitted only when the user presses the Search button or the Enter key.

```text
Enter a title → Submit search → Request TVMaze → Display matching shows
```

Clearing the search field reloads the initial show catalog. Failed requests can be repeated with the Try Again button.

## API

This project uses the free [TVMaze API](https://www.tvmaze.com/api).

```text
GET https://api.tvmaze.com/shows
GET https://api.tvmaze.com/search/shows?q=:query
```

No API key or environment variable is required.

## Getting Started

### Prerequisites

- Node.js 22.22 or newer
- npm

### Installation

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Open the local URL displayed by Vite, normally `http://localhost:5173`.

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Create an optimized production build |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Check the project with ESLint |

## Project Structure

```text
src/
├── assets/                 # Imported images and branding
├── components/
│   ├── common/             # Loading, error, and empty states
│   ├── layout/             # Navbar and Footer
│   └── movies/             # Search, cards, grid, modal, and pagination
├── hooks/
│   └── useMovies.js        # Movie data, loading, error, search, and retry logic
├── layouts/
│   └── MainLayout.jsx      # Shared page shell
├── pages/                  # Route-level page components
├── router/
│   └── router.jsx          # Application routes
├── services/
│   └── tvmazeApi.js        # TVMaze request functions
├── index.css               # Tailwind, daisyUI, and global styles
└── main.jsx                # React entry point and RouterProvider
```

## Production Deployment

The project is configured for Vercel. The root-level `vercel.json` rewrites application routes to `index.html`, allowing React Router paths such as `/movies` to work when opened directly or refreshed.

Before deploying, verify the project locally:

```bash
npm run lint
npm run build
```



# Movie Explorer — Development Plan

## 1. Project Goal

React ও TVMaze API ব্যবহার করে একটি responsive Movie Explorer app তৈরি করা হবে। User home page থেকে movie listing page-এ যেতে পারবে, সব shows browse করতে পারবে, title দিয়ে search করতে পারবে এবং কোনো card-এর `See Details` button চাপলে modal-এ বিস্তারিত তথ্য দেখতে পারবে।

## 2. Main Technology

- React + Vite
- React Router DOM
- CSS অথবা Tailwind CSS
- TVMaze API
- All shows endpoint: `https://api.tvmaze.com/shows`
- Search endpoint: `https://api.tvmaze.com/search/shows?q=:query`

## 3. Pages and Routes

এই project-এর জন্য মোট ৩টি route থাকবে:

| Route | Page | কাজ |
| --- | --- | --- |
| `/` | `HomePage.jsx` | Navbar, hero banner, CTA এবং footer দেখাবে |
| `/movies` | `MoviesPage.jsx` | Shows load, search এবং responsive movie grid দেখাবে |
| `*` | `NotFoundPage.jsx` | ভুল URL-এর জন্য 404 message ও Home button দেখাবে |

`Movie Details` আলাদা page/route হবে না। এটি `MoviesPage`-এর উপর reusable modal হিসেবে খুলবে।

## 4. Router কোথায় থাকবে?

- একটিমাত্র central router file থাকবে: `src/router/router.jsx`
- `createBrowserRouter` দিয়ে সব route এই file-এ define করা হবে।
- `src/main.jsx`-এ `RouterProvider` দিয়ে router render করা হবে।
- Shared `Navbar` ও `Footer` রাখার জন্য `src/layouts/MainLayout.jsx` ব্যবহার করা হবে।
- `MainLayout`-এর `<Outlet />`-এ `HomePage`, `MoviesPage` অথবা `NotFoundPage` render হবে।

Router flow:

```text
main.jsx
└── RouterProvider
    └── router/router.jsx
        └── MainLayout.jsx
            ├── Navbar
            ├── Outlet (current page)
            └── Footer
```

> `react-router-dom` বর্তমানে `package.json`-এ নেই। Router implementation phase-এ dependency install করতে হবে।

## 5. Recommended Folder Structure

```text
movie-explorer/
├── public/
│   ├── images/
│   │   ├── hero_section.jpg
│   │   └── pngtcinema_background.jpg
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/
│   │   ├── hero.png
│   │   └── logo.png
│   ├── components/
│   │   ├── common/
│   │   │   ├── ErrorMessage.jsx
│   │   │   └── LoadingSpinner.jsx
│   │   ├── layout/
│   │   │   ├── Footer.jsx
│   │   │   └── Navbar.jsx
│   │   └── movies/
│   │       ├── MovieCard.jsx
│   │       ├── MovieGrid.jsx
│   │       ├── MovieModal.jsx
│   │       └── SearchBar.jsx
│   ├── hooks/
│   │   └── useMovies.js
│   ├── layouts/
│   │   └── MainLayout.jsx
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── MoviesPage.jsx
│   │   └── NotFoundPage.jsx
│   ├── router/
│   │   └── router.jsx
│   ├── services/
│   │   └── movieApi.js
│   ├── utils/
│   │   ├── formatMovie.js
│   │   └── stripHtml.js
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── .env.example
├── README.md
├── package.json
└── plan.md
```

### Existing folder note

- `src/assets`, `src/hooks`, `src/pages` এবং `src/providers` ইতোমধ্যে আছে।
- Existing folder-এর নাম `src/componenets`; এটি spelling mistake। Implementation-এর সময় `src/components` নামে rename করতে হবে।
- এই app ছোট হওয়ায় শুরুতে `providers` প্রয়োজন নেই। অনেক component-এর মধ্যে global state share করার দরকার হলে পরে ব্যবহার করা যাবে।
- এখন কোনো নতুন folder বা component create করা হবে না; structure-টি implementation guide হিসেবে দেওয়া হলো।

## 6. কোন Folder-এ কী থাকবে?

| Folder/File | Responsibility |
| --- | --- |
| `public/` | Directly served static images, favicon ও icons |
| `src/assets/` | Component থেকে import করা logo ও local images |
| `src/components/common/` | App-wide reusable loading ও error UI |
| `src/components/layout/` | Shared Navbar ও Footer |
| `src/components/movies/` | Movie/search/modal সম্পর্কিত reusable components |
| `src/hooks/` | Fetching, search, loading ও error state-এর reusable logic |
| `src/layouts/` | Shared page shell এবং React Router `<Outlet />` |
| `src/pages/` | Route-level components |
| `src/router/` | App-এর central route configuration |
| `src/services/` | TVMaze API request functions ও base URL |
| `src/utils/` | API data format এবং HTML summary clean করার helper |
| `App.jsx` | চাইলে app-level wrapper; router ব্যবহার করলে এটি খুব ছোট থাকবে |
| `main.jsx` | React app mount এবং `RouterProvider` setup |
| `index.css` | Reset, CSS variables ও global styles |
| `App.css` | Shared app styles; component CSS আলাদা করলে পরে ভাগ করা যাবে |

## 7. Component Responsibilities

### `Navbar.jsx`

- App logo/name
- Home এবং Movies navigation links
- Mobile navigation behavior

### `HeroSection.jsx`

- `HomePage.jsx`-এর ভেতরে রাখতে হবে অথবা Home-এর আলাদা component করা যাবে
- Movie background image/gradient
- Heading ও short description
- `/movies` route-এ যাওয়ার CTA button

### `SearchBar.jsx`

- Controlled search input
- Search query parent page/hook-এ পাঠাবে
- Input clear button রাখা যেতে পারে

### `MovieGrid.jsx`

- Movies array map করবে
- Responsive grid maintain করবে
- Empty result state দেখাবে

### `MovieCard.jsx`

- Poster
- Title/name
- Premiere year/date
- Rating
- Language এবং genres
- `See Details` button

### `MovieModal.jsx`

- Selected show-এর large poster/backdrop
- Title, summary, rating, release date, language ও genres
- Close button
- Backdrop click এবং `Escape` key দিয়ে close করা যেতে পারে
- Modal open থাকলে accessibility-এর জন্য focus ও scroll behavior খেয়াল রাখতে হবে

## 8. Development Phases

### Phase 1 — Project Preparation

- Existing Vite setup check করা
- `componenets` folder-এর নাম পরে `components` করা
- প্রয়োজনীয় folder structure তৈরি করা
- `react-router-dom` install করা
- Global color, spacing ও typography ঠিক করা

**Phase output:** Clean base structure এবং dependencies ready।

### Phase 2 — Router and Shared Layout

- `router/router.jsx`-এ routes define করা
- `MainLayout.jsx` তৈরি করে Navbar, Outlet ও Footer বসানো
- Navbar link ও active state তৈরি করা
- Unknown route-এর জন্য `NotFoundPage` যোগ করা

**Phase output:** `/`, `/movies` এবং `*` navigation কাজ করবে।

### Phase 3 — Home Page

- Hero image/gradient বসানো
- App title ও description দেখানো
- CTA button-কে `/movies`-এর সঙ্গে link করা
- Mobile ও desktop responsive layout করা

**Phase output:** README অনুযায়ী সম্পূর্ণ landing page।

### Phase 4 — API Service and Data State

- `movieApi.js`-এ all shows ও search request functions রাখা
- `useMovies.js`-এ movies, loading, error ও query state manage করা
- Initial load-এ `/shows` endpoint call করা
- Search query থাকলে `/search/shows` endpoint call করা
- Rapid typing-এর অপ্রয়োজনীয় request কমাতে debounce ব্যবহার করা যেতে পারে

**Phase output:** TVMaze data UI-তে ব্যবহারের জন্য ready।

### Phase 5 — Movie Listing Page

- Search bar তৈরি করা
- Responsive grid তৈরি করা
- Reusable card দিয়ে shows render করা
- Missing poster/rating/date-এর fallback দেখানো
- Loading, error এবং no-result state দেখানো

**Phase output:** Browse ও title search feature কাজ করবে।

### Phase 6 — Movie Details Modal

- Card-এর `See Details` click থেকে selected show state set করা
- Modal-এ full information দেখানো
- Close button, backdrop এবং `Escape` close behavior যোগ করা
- Summary-এর API HTML নিরাপদভাবে clean/render করা

**Phase output:** User selected show-এর details modal-এ দেখতে পারবে।

### Phase 7 — Responsive Design and Polish

- Mobile: 1-column card grid
- Tablet: 2-column card grid
- Desktop: 3–4+ column card grid
- Touch-friendly button ও input sizing
- Hover, focus এবং transition state
- Modal-এর small-screen layout ঠিক করা

**Phase output:** সব screen size-এ usable ও consistent UI।

### Phase 8 — Testing and Deployment

- Navigation, search, modal এবং error states manually test করা
- Empty/missing API fields test করা
- `npm run lint` চালানো
- `npm run build` চালিয়ে production build verify করা
- GitHub repository এবং Vercel/Netlify deployment প্রস্তুত করা
- শেষে প্রকৃত `README.md`-তে setup ও live-link যোগ করা

**Phase output:** Submission-ready application।

## 9. State and Data Flow

```text
MoviesPage
├── useMovies(query)
│   ├── movieApi.js
│   ├── movies
│   ├── loading
│   └── error
├── SearchBar → query update
├── MovieGrid
│   └── MovieCard → selectedMovie update
└── MovieModal ← selectedMovie
```

Search ও selected movie state `MoviesPage`-এ রাখাই যথেষ্ট। এই assignment-এর জন্য Context Provider বাধ্যতামূলক নয়।

## 10. Important Data Handling

TVMaze-এর response দুই ধরনের:

- `/shows` সরাসরি show object array দেয়।
- `/search/shows` প্রতিটি result-এ `{ score, show }` shape দেয়।

`formatMovie.js` দিয়ে দুই response-কে একই shape-এ normalize করলে `MovieCard` ও `MovieModal` সহজ থাকবে। Missing values-এর জন্য fallback ব্যবহার করতে হবে:

- Poster না থাকলে placeholder image
- Rating না থাকলে `N/A`
- Premiere date না থাকলে `Unknown`
- Genres না থাকলে `Not available`

## 11. Final User Flow

1. User `/` Home page-এ আসবে।
2. Navbar-এর Movies link অথবা hero CTA click করবে।
3. Router user-কে `/movies`-এ নিয়ে যাবে।
4. Page initial shows fetch করে cards দেখাবে।
5. User title লিখলে search results update হবে।
6. `See Details` click করলে selected show-এর modal খুলবে।
7. Modal close করে user browsing চালিয়ে যেতে পারবে।
8. ভুল URL দিলে `NotFoundPage` দেখাবে।

## 12. Recommended Build Order

1. Folder naming ও structure
2. Router + layout
3. Home page
4. API service + custom hook
5. Movies page + search
6. Cards + responsive grid
7. Details modal
8. Loading/error/empty states
9. Responsive polish
10. Lint, build, deploy ও README update

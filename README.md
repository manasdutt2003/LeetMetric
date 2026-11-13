# LeetMetric

A LeetCode stats visualizer built with Next.js, Tailwind CSS and Framer Motion.
Enter a username to see problems solved by difficulty, measured against the
live number of problems on LeetCode, plus global ranking.

**Live:** https://leet-metric-seven.vercel.app

## Features

- Looks up any public LeetCode profile through a server-side proxy to
  LeetCode's GraphQL API (the browser cannot call it directly because of CORS)
- Animated progress rings for Easy, Medium and Hard
- Problem totals come from LeetCode at request time, so the percentages stay
  correct as new problems are added
- Clear messages for unknown users, invalid usernames and upstream outages

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

```bash
npm run lint     # ESLint
npm run build    # production build
```

## Tech stack

- [Next.js](https://nextjs.org/) 16 (App Router) with React 19 and TypeScript
- [Tailwind CSS](https://tailwindcss.com/) 4
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide](https://lucide.dev/) icons

## API

`POST /api/leetcode`

```json
{ "username": "someuser" }
```

Response:

```json
{
  "username": "someuser",
  "ranking": 123456,
  "stats": {
    "All":    { "solved": 420, "total": 3600, "submissions": 610 },
    "Easy":   { "solved": 180, "total": 900,  "submissions": 240 },
    "Medium": { "solved": 200, "total": 1880, "submissions": 310 },
    "Hard":   { "solved": 40,  "total": 820,  "submissions": 60 }
  }
}
```

The numbers above are illustrative.

| Status | Meaning |
| --- | --- |
| 400 | Missing or malformed username |
| 404 | No such LeetCode user |
| 502 / 504 | LeetCode was unreachable or timed out |

## Project layout

| Path | Purpose |
| --- | --- |
| `src/app/page.tsx` | Search page |
| `src/app/api/leetcode/route.ts` | Proxy to LeetCode's GraphQL API |
| `src/components/` | Stats card and progress ring |
| `src/lib/leetcode.ts` | Shared types and username validation |
| `legacy/` | The original plain HTML/Express version, kept for reference |

This project is not affiliated with LeetCode. It reads public profile data
through an unofficial endpoint that may change without notice.

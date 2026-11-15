# Architecture

LeetMetric is a small Next.js (App Router) application with one page and one
API route.

```
Browser (src/app/page.tsx)
   |  POST /api/leetcode { username }
   v
Next.js route handler (src/app/api/leetcode/route.ts)
   |  GraphQL query
   v
LeetCode GraphQL API (unofficial, may change)
```

## Modules

| Module | Responsibility |
| --- | --- |
| `src/app/page.tsx` | Client component. Holds the form, loading and error state. Validates the username with `USERNAME_PATTERN` before calling the API. Parses the response defensively, because a gateway error page is HTML rather than JSON. |
| `src/app/api/leetcode/route.ts` | Server-side proxy to LeetCode. It exists because the browser cannot call LeetCode's GraphQL endpoint directly (CORS). It maps failures to the status codes listed in the README (400, 404, 502/504). |
| `src/lib/leetcode.ts` | Types shared by the client and the route, plus username validation. |
| `src/components/StatsCard.tsx`, `ProgressRing.tsx` | Presentation. The ring animates with Framer Motion. |
| `legacy/` | The original Express and plain HTML version, kept for reference only. It is not part of the current build. |
| `n8n/` | An importable workflow that calls the same public endpoint. |

## Design decisions

- **Server-side proxy.** It sidesteps CORS and keeps the upstream query in one place.
- **Live totals.** Problem totals are fetched from LeetCode at request time, so percentages stay correct as problems are added.
- **Shared validation.** The same pattern and types are used on the client and the server, so the two cannot drift apart.
- **Explicit error mapping.** Unknown user, bad input and upstream outage are distinct, user-visible states.

## Deployment

- Vercel: the live deployment.
- Docker: `output: "standalone"` in `next.config.ts` lets the `Dockerfile` ship only the traced runtime files. See the README.

## Known limitations

- The upstream API is unofficial and can change without notice.
- There is no caching or rate limiting in front of LeetCode.
- There is no automated test suite yet. Pure logic such as username validation in `src/lib/leetcode.ts` is the natural first target.

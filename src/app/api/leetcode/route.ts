import { NextResponse } from "next/server";
import {
  DIFFICULTIES,
  USERNAME_PATTERN,
  type Difficulty,
  type DifficultyStats,
  type LeetCodeStats,
} from "@/lib/leetcode";

const LEETCODE_GRAPHQL = "https://leetcode.com/graphql/";
const UPSTREAM_TIMEOUT_MS = 8000;

// allQuestionsCount returns the live number of problems per difficulty, so
// the progress rings stay correct as LeetCode adds problems.
const QUERY = `
  query getUserProfile($username: String!) {
    allQuestionsCount {
      difficulty
      count
    }
    matchedUser(username: $username) {
      username
      submitStats: submitStatsGlobal {
        acSubmissionNum {
          difficulty
          count
          submissions
        }
      }
      profile {
        ranking
      }
    }
  }
`;

interface CountRow {
  difficulty: string;
  count: number;
  submissions?: number;
}

interface UpstreamResponse {
  errors?: { message: string }[];
  data?: {
    allQuestionsCount?: CountRow[];
    matchedUser?: {
      username: string;
      submitStats?: { acSubmissionNum?: CountRow[] };
      profile?: { ranking?: number | null };
    } | null;
  };
}

function errorResponse(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

export async function POST(request: Request) {
  let username: unknown;
  try {
    ({ username } = await request.json());
  } catch {
    return errorResponse("Request body must be JSON.", 400);
  }

  if (typeof username !== "string" || !username.trim()) {
    return errorResponse("Username is required.", 400);
  }
  username = username.trim();
  if (!USERNAME_PATTERN.test(username as string)) {
    return errorResponse(
      "Usernames can only contain letters, numbers, underscores and hyphens.",
      400
    );
  }

  let upstream: UpstreamResponse;
  try {
    const response = await fetch(LEETCODE_GRAPHQL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Referer: "https://leetcode.com",
        // LeetCode rejects some requests that carry no browser-like agent.
        "User-Agent": "Mozilla/5.0 (compatible; LeetMetric)",
      },
      body: JSON.stringify({ query: QUERY, variables: { username } }),
      signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
      cache: "no-store",
    });
    if (!response.ok) {
      return errorResponse(
        `LeetCode responded with status ${response.status}. Try again shortly.`,
        502
      );
    }
    upstream = await response.json();
  } catch (error) {
    const timedOut = error instanceof Error && error.name === "TimeoutError";
    return errorResponse(
      timedOut ? "LeetCode took too long to respond." : "Could not reach LeetCode.",
      timedOut ? 504 : 502
    );
  }

  const user = upstream.data?.matchedUser;
  if (!user) {
    // LeetCode reports an unknown user as a GraphQL error plus a null user.
    return errorResponse(`No LeetCode user named "${username}".`, 404);
  }

  const solved = user.submitStats?.acSubmissionNum ?? [];
  const totals = upstream.data?.allQuestionsCount ?? [];
  const row = (rows: CountRow[], difficulty: Difficulty) =>
    rows.find((entry) => entry.difficulty === difficulty);

  const stats = Object.fromEntries(
    DIFFICULTIES.map((difficulty) => [
      difficulty,
      {
        solved: row(solved, difficulty)?.count ?? 0,
        total: row(totals, difficulty)?.count ?? 0,
        submissions: row(solved, difficulty)?.submissions ?? 0,
      } satisfies DifficultyStats,
    ])
  ) as Record<Difficulty, DifficultyStats>;

  const result: LeetCodeStats = {
    username: user.username,
    ranking: user.profile?.ranking ?? null,
    stats,
  };
  return NextResponse.json(result);
}

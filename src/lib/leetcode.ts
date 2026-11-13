export type Difficulty = "All" | "Easy" | "Medium" | "Hard";

export interface DifficultyStats {
  /** Problems the user has solved at this difficulty. */
  solved: number;
  /** Problems that exist on LeetCode at this difficulty. */
  total: number;
  /** Accepted submissions, counting repeats. */
  submissions: number;
}

export interface LeetCodeStats {
  username: string;
  ranking: number | null;
  stats: Record<Difficulty, DifficultyStats>;
}

export const DIFFICULTIES: Difficulty[] = ["All", "Easy", "Medium", "Hard"];

// LeetCode usernames are letters, digits, underscores and hyphens.
export const USERNAME_PATTERN = /^[A-Za-z0-9_-]{1,40}$/;

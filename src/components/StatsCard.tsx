"use client";
import { motion } from "framer-motion";
import ProgressRing from "./ProgressRing";
import { User, Trophy } from "lucide-react";
import type { Difficulty, LeetCodeStats } from "@/lib/leetcode";

const RINGS: { difficulty: Difficulty; color: string; text: string }[] = [
    { difficulty: "Easy", color: "#10b981", text: "text-emerald-500/80" },
    { difficulty: "Medium", color: "#f59e0b", text: "text-yellow-500/80" },
    { difficulty: "Hard", color: "#ef4444", text: "text-red-500/80" },
];

function percent(solved: number, total: number) {
    return total > 0 ? Math.min((solved / total) * 100, 100) : 0;
}

export default function StatsCard({ data }: { data: LeetCodeStats }) {
    const { username, ranking, stats } = data;
    const all = stats.All;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-zinc-900 text-white p-8 rounded-2xl shadow-2xl w-full max-w-3xl border border-zinc-800"
        >
            <div className="flex flex-col md:flex-row items-center justify-between mb-8 border-b border-zinc-800 pb-6 gap-4">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-emerald-500/10 rounded-full text-emerald-500 border border-emerald-500/20">
                        <User size={32} aria-hidden="true" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight break-all">
                            <a
                                href={`https://leetcode.com/u/${encodeURIComponent(username)}/`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-emerald-400 transition-colors"
                            >
                                {username}
                            </a>
                        </h2>
                        <div className="flex items-center gap-2 text-zinc-400 mt-1">
                            <Trophy size={16} className="text-yellow-500" aria-hidden="true" />
                            <span className="font-mono text-sm">
                                Rank: {ranking ? ranking.toLocaleString() : "N/A"}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="text-center md:text-right bg-zinc-950/50 p-3 rounded-lg border border-zinc-800">
                    <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Total Solved</p>
                    <p className="text-4xl font-black text-white">
                        {all.solved.toLocaleString()}
                        {all.total > 0 && (
                            <span className="text-base font-medium text-zinc-500"> / {all.total.toLocaleString()}</span>
                        )}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
                {RINGS.map(({ difficulty, color, text }) => {
                    const { solved, total } = stats[difficulty];
                    const share = percent(solved, total);
                    return (
                        <div key={difficulty} className="flex flex-col items-center gap-2">
                            <ProgressRing count={solved} label={difficulty} color={color} progress={share} />
                            <span className={`text-xs ${text}`}>
                                {total > 0
                                    ? `${share.toFixed(1)}% of ${total.toLocaleString()} solved`
                                    : "Total unavailable"}
                            </span>
                        </div>
                    );
                })}
            </div>
        </motion.div>
    );
}

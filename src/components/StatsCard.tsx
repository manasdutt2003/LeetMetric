"use client";
import { motion } from "framer-motion";
import ProgressRing from "./ProgressRing";
import { User, Trophy } from "lucide-react";

export default function StatsCard({ data }: { data: any }) {
    if (!data?.matchedUser) return null;

    const { matchedUser } = data;
    const { username, submitStats, profile } = matchedUser;
    const acSubmissionNum = submitStats.acSubmissionNum;

    const easy = acSubmissionNum.find((s: any) => s.difficulty === "Easy")?.count || 0;
    const medium = acSubmissionNum.find((s: any) => s.difficulty === "Medium")?.count || 0;
    const hard = acSubmissionNum.find((s: any) => s.difficulty === "Hard")?.count || 0;
    const totalSolved = acSubmissionNum.find((s: any) => s.difficulty === "All")?.count || 0;

    // Approximate total problem counts on LeetCode for progress visualization
    const E_TOTAL = 850;
    const M_TOTAL = 1750;
    const H_TOTAL = 750;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-zinc-900 text-white p-8 rounded-2xl shadow-2xl w-full max-w-3xl border border-zinc-800"
        >
            <div className="flex flex-col md:flex-row items-center justify-between mb-8 border-b border-zinc-800 pb-6 gap-4">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-emerald-500/10 rounded-full text-emerald-500 border border-emerald-500/20">
                        <User size={32} />
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">{username}</h2>
                        <div className="flex items-center gap-2 text-zinc-400 mt-1">
                            <Trophy size={16} className="text-yellow-500" />
                            <span className="font-mono text-sm">Rank: {profile?.ranking?.toLocaleString() ?? "N/A"}</span>
                        </div>
                    </div>
                </div>

                <div className="text-center md:text-right bg-zinc-950/50 p-3 rounded-lg border border-zinc-800">
                    <p className="text-xs text-zinc-500 uppercase tracking-wider mb-1">Total Solved</p>
                    <p className="text-4xl font-black text-white">{totalSolved}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
                <div className="flex flex-col items-center gap-2">
                    <ProgressRing count={easy} label="Easy" color="#10b981" progress={Math.min((easy / E_TOTAL) * 100, 100)} />
                    <span className="text-xs text-emerald-500/80">Beats {((easy / E_TOTAL) * 100).toFixed(1)}%</span>
                </div>

                <div className="flex flex-col items-center gap-2">
                    <ProgressRing count={medium} label="Medium" color="#f59e0b" progress={Math.min((medium / M_TOTAL) * 100, 100)} />
                    <span className="text-xs text-yellow-500/80">Beats {((medium / M_TOTAL) * 100).toFixed(1)}%</span>
                </div>

                <div className="flex flex-col items-center gap-2">
                    <ProgressRing count={hard} label="Hard" color="#ef4444" progress={Math.min((hard / H_TOTAL) * 100, 100)} />
                    <span className="text-xs text-red-500/80">Beats {((hard / H_TOTAL) * 100).toFixed(1)}%</span>
                </div>
            </div>
        </motion.div>
    );
}

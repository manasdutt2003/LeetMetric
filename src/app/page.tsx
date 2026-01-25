"use client";
import { useState } from "react";
import StatsCard from "@/components/StatsCard";
import { Search, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const [username, setUsername] = useState("");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;

    setLoading(true);
    setError("");
    setData(null);

    try {
      const res = await fetch("/api/leetcode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });

      const result = await res.json();

      if (result.error) {
        throw new Error(result.error);
      }

      if (result.errors) {
        throw new Error(result.errors[0]?.message || "LeetCode API Error");
      }
      if (!result.data?.matchedUser) {
        throw new Error("User not found via API");
      }

      setData(result.data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900 via-zinc-950 to-black overflow-x-hidden">
      <div className="w-full max-w-4xl flex flex-col items-center gap-12 z-10">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="text-center space-y-4"
        >
          <div className="relative inline-block">
            <h1 className="text-7xl font-black tracking-tighter text-white drop-shadow-2xl">
              Leet<span className="text-emerald-500">Metric</span>
            </h1>
            <div className="absolute -inset-1 blur-2xl bg-emerald-500/20 -z-10 rounded-full"></div>
          </div>
          <p className="text-zinc-400 text-xl font-light">
            Visualize your LeetCode progress with style.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
          onSubmit={handleSearch}
          className="w-full max-w-md relative flex items-center group"
        >
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-zinc-500 group-focus-within:text-emerald-500 transition-colors">
            <Search size={22} />
          </div>
          <input
            type="text"
            placeholder="Enter username..."
            className="w-full bg-zinc-900/80 border border-zinc-700/50 rounded-2xl py-5 pl-14 pr-24 text-white text-lg placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all shadow-xl backdrop-blur-xl"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button
            type="submit"
            disabled={loading}
            className="absolute right-3 top-3 bottom-3 bg-white hover:bg-zinc-200 text-black px-6 rounded-xl text-sm font-bold transition-transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : "Search"}
          </button>
        </motion.form>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-400 bg-red-400/10 px-6 py-3 rounded-xl border border-red-400/20 font-medium"
          >
            {error}
          </motion.div>
        )}

        {data && <StatsCard data={data} />}
      </div>

      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-emerald-500/10 blur-[100px] rounded-full mix-blend-screen animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full mix-blend-screen animate-pulse"></div>
      </div>
    </main>
  );
}

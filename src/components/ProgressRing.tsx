"use client";
import { motion } from "framer-motion";

interface ProgressRingProps {
    radius?: number;
    stroke?: number;
    progress: number;
    color: string;
    label: string;
    count: number;
}

export default function ProgressRing({
    radius = 60,
    stroke = 8,
    progress,
    color,
    label,
    count
}: ProgressRingProps) {
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
        <div className="flex flex-col items-center justify-center p-4">
            <div className="relative flex items-center justify-center">
                <svg
                    height={radius * 2}
                    width={radius * 2}
                    className="-rotate-90 transform"
                >
                    <circle
                        stroke="var(--secondary)" // Uses CSS variable
                        strokeWidth={stroke}
                        fill="transparent"
                        r={normalizedRadius}
                        cx={radius}
                        cy={radius}
                    />
                    <motion.circle
                        stroke={color}
                        strokeWidth={stroke}
                        fill="transparent"
                        strokeLinecap="round"
                        r={normalizedRadius}
                        cx={radius}
                        cy={radius}
                        strokeDasharray={circumference + " " + circumference}
                        initial={{ strokeDashoffset: circumference }}
                        animate={{ strokeDashoffset }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                </svg>
                <div className="absolute flex flex-col items-center">
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-2xl font-bold"
                    >
                        {count}
                    </motion.span>
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{label}</span>
                </div>
            </div>
        </div>
    );
}

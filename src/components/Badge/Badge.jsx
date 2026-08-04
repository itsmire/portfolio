import React from 'react';

/**
 * Reusable Badge component for skills, tags, or status labels.
 */
export default function Badge({ children, variant = "default" }) {
  const base = "inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium border transition-all duration-200";
  const styles = {
    default: "bg-purple-500/10 text-purple-600 border-purple-500/20 dark:text-purple-400 dark:bg-purple-500/10 dark:border-purple-500/20",
    muted: "bg-zinc-100 text-zinc-600 border-zinc-200 dark:bg-zinc-900/50 dark:text-zinc-400 dark:border-zinc-800/80",
    success: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400 dark:bg-emerald-500/10 dark:border-emerald-500/20"
  };

  return (
    <span className={`${base} ${styles[variant] || styles.default}`}>
      {children}
    </span>
  );
}

import React from 'react';
import { motion } from 'framer-motion';

/**
 * Reusable Button component with built-in spring tap animations.
 */
export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  external,
  onClick,
  className = "",
  ...props
}) {
  const sizes = {
    sm: "px-3 py-1.5 text-xs rounded-lg",
    md: "px-5 py-2.5 text-sm rounded-xl",
    lg: "px-7 py-3.5 text-base rounded-2xl",
  };

  const variants = {
    primary: "bg-purple-600 hover:bg-purple-500 active:bg-purple-700 text-white border border-transparent shadow-sm hover:shadow-purple-500/10 hover:-translate-y-0.5",
    outline: "bg-transparent text-zinc-800 border-zinc-200 hover:border-zinc-300 dark:text-zinc-100 dark:border-zinc-800 dark:hover:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 hover:-translate-y-0.5",
    ghost: "bg-transparent text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-900/50",
  };

  const classes = `inline-flex items-center justify-center gap-2 font-medium transition-all duration-300 cursor-pointer select-none ${sizes[size]} ${variants[variant]} ${className}`;

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={classes} {...props}>
          {children}
        </a>
      );
    }
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={classes}
      {...props}
    >
      {children}
    </motion.button>
  );
}

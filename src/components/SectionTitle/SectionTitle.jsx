import React from 'react';
import { motion } from 'framer-motion';
import { fadeUp } from '../../utils/animationVariants';

/**
 * Reusable SectionTitle component dùng cho tiêu đề các mục trong trang.
 */
export default function SectionTitle({ eyebrow, title, subtitle, center = false }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      className={`mb-12 ${center ? "text-center" : ""}`}
    >
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-widest mb-3 text-purple-500 dark:text-purple-400">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-3 text-zinc-900 dark:text-zinc-50 font-heading">
        {title}
      </h2>
      {subtitle && (
        <p
          className={`text-base max-w-2xl leading-relaxed text-zinc-600 dark:text-zinc-400 ${
            center ? "mx-auto" : ""
          }`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '../../utils/animationVariants';
import SectionTitle from '../../components/SectionTitle';
import ProjectCard from '../../components/ui/ProjectCard';
import { PROJECTS } from '../../data/projects';

const categories = ["Tất cả", "UI/UX Design", "Web App", "E-commerce"];

export default function Projects() {
  const showFilters = PROJECTS.length > 1;
  const [activeFilter, setActiveFilter] = useState("Tất cả");

  const filtered = activeFilter === "Tất cả"
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeFilter);

  return (
    <div className="py-16 px-4 sm:px-6 max-w-6xl mx-auto">
      <SectionTitle
        eyebrow="Dự Án"
        title="Dự án thực tế"
        subtitle="Sản phẩm thiết kế chuyên nghiệp trong Figma kết hợp mã nguồn và giao diện giả lập tương tác trực tiếp."
        center
      />

      {/* Filter tabs (Chỉ hiện khi có nhiều dự án khác nhau) */}
      {showFilters && (
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((cat) => (
            <motion.button
              key={cat}
              variants={fadeUp}
              onClick={() => setActiveFilter(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                activeFilter === cat
                  ? "bg-purple-600 text-white shadow-lg shadow-purple-500/20"
                  : "glass border border-zinc-200/50 dark:border-zinc-800/50 text-zinc-600 dark:text-zinc-400 hover:border-purple-500/30 hover:text-purple-500 dark:hover:text-purple-400"
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>
      )}

      {/* Projects grid */}
      <motion.div
        key={activeFilter}
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${filtered.length === 1 ? "max-w-2xl mx-auto" : ""}`}
      >
        {filtered.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </motion.div>

      {filtered.length === 0 && (
        <div className="text-center py-20 text-zinc-500 dark:text-zinc-500">
          Chưa có dự án nào trong danh mục này.
        </div>
      )}
    </div>
  );
}

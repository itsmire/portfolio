import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fadeUp } from '../../../utils/animationVariants';
import SectionTitle from '../../../components/SectionTitle';
import ProjectCard from '../../../components/ui/ProjectCard';
import { getFeaturedProjects } from '../../../data/projects';

export default function FeaturedProjects() {
  const featured = getFeaturedProjects();

  return (
    <section id="projects" className="py-24 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <SectionTitle
            eyebrow="Dự Án"
            title="Công trình nổi bật"
            subtitle="Từ thiết kế UI/UX trong Figma đến sản phẩm web hoàn chỉnh."
          />
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="shrink-0 mb-12">
            <Link
              to="/projects"
              className="text-sm font-medium text-purple-500 dark:text-purple-400 hover:text-purple-400 dark:hover:text-purple-300 transition-colors flex items-center gap-1 whitespace-nowrap"
            >
              Xem tất cả →
            </Link>
          </motion.div>
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${featured.length === 1 ? "max-w-2xl mx-auto lg:grid-cols-1 md:grid-cols-1" : ""}`}>
          {featured.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

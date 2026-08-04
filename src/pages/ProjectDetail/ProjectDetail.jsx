import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faFigma } from '@fortawesome/free-brands-svg-icons';
import {
  faArrowLeft,
  faArrowUpRightFromSquare,
  faCalendar,
  faCode,
  faLayerGroup,
  faPlay,
  faFileLines,
  faExpand,
} from '@fortawesome/free-solid-svg-icons';
import { staggerContainer, fadeUp, fadeIn } from '../../utils/animationVariants';
import Badge from '../../components/Badge';
import { getProjectById } from '../../data/projects';

const tabs = [
  { id: 'overview', label: 'Tổng quan', icon: faFileLines },
  { id: 'demo', label: 'Live Demo', icon: faPlay },
];

export default function ProjectDetail() {
  const { id } = useParams();
  const project = getProjectById(id);
  const hasDemo = !!project?.demo;
  const [activeTab, setActiveTab] = useState(hasDemo ? 'demo' : 'overview');

  if (!project) {
    return (
      <div className="py-20 px-4 text-center">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
          Không tìm thấy dự án
        </h1>
        <p className="text-zinc-500 mb-8">
          Dự án <code className="text-purple-500">"{id}"</code> không tồn tại.
        </p>
        <Link to="/projects" className="text-purple-500 hover:text-purple-400 font-medium">
          ← Quay lại danh sách dự án
        </Link>
      </div>
    );
  }

  return (
    <div className="py-10 px-4 sm:px-6 max-w-5xl mx-auto">
      {/* Back link */}
      <Link
        to="/projects"
        className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-purple-500 dark:text-zinc-400 dark:hover:text-purple-400 transition-colors mb-8"
      >
        <FontAwesomeIcon icon={faArrowLeft} size="xs" />
        Quay lại tất cả dự án
      </Link>

      {/* Header */}
      <motion.div variants={staggerContainer} initial="hidden" animate="visible">
        <motion.div variants={fadeUp}>
          {project.category && (
            <span className="text-xs font-bold uppercase tracking-widest text-purple-500 dark:text-purple-400 mb-3 block">
              <FontAwesomeIcon icon={faLayerGroup} className="mr-1.5" />
              {project.category}
            </span>
          )}
          <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-2 font-heading tracking-tight leading-tight">
            {project.title}
          </h1>
          <p className="text-base text-purple-500 dark:text-purple-400 font-medium mb-4">
            {project.subtitle}
          </p>
          <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 max-w-2xl mb-6">
            {project.description}
          </p>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-3 mb-8">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium bg-zinc-900 dark:bg-zinc-100 text-zinc-50 dark:text-zinc-950 hover:opacity-85 transition-all duration-300 hover:-translate-y-0.5"
              >
                <FontAwesomeIcon icon={faGithub} />
                GitHub
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium bg-purple-600 hover:bg-purple-500 text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-purple-500/25"
              >
                <FontAwesomeIcon icon={faExpand} size="sm" />
                Mở toàn màn hình
              </a>
            )}
            {project.figma && (
              <a
                href={project.figma}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium glass border border-zinc-200/60 dark:border-zinc-700/60 text-zinc-800 dark:text-zinc-100 hover:border-pink-500/30 hover:text-pink-500 transition-all duration-300 hover:-translate-y-0.5"
              >
                <FontAwesomeIcon icon={faFigma} />
                Figma
              </a>
            )}
          </div>
        </motion.div>

        {/* Tabs — chỉ hiện khi có demo */}
        {hasDemo && (
          <motion.div variants={fadeUp} className="flex gap-1 mb-6 p-1 glass rounded-xl border border-zinc-200/50 dark:border-zinc-800/50 w-fit">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-medium transition-all duration-300 cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-500/20'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
                }`}
              >
                <FontAwesomeIcon icon={tab.icon} size="xs" />
                {tab.label}
              </button>
            ))}
          </motion.div>
        )}

        {/* ============= LIVE DEMO IFRAME ============= */}
        <AnimatePresence mode="wait">
          {activeTab === 'demo' && hasDemo && (
            <motion.div
              key="demo"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="mb-10"
            >
              {/* Toolbar */}
              <div className="flex items-center justify-between px-4 py-2.5 glass rounded-t-xl border border-b-0 border-zinc-200/50 dark:border-zinc-800/50">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-400/70" />
                  <span className="w-3 h-3 rounded-full bg-amber-400/70" />
                  <span className="w-3 h-3 rounded-full bg-emerald-400/70" />
                </div>
                <span className="text-xs text-zinc-400 dark:text-zinc-500 font-mono">
                  {project.title} — Live Demo
                </span>
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-purple-500 hover:text-purple-400 flex items-center gap-1 transition-colors"
                >
                  <FontAwesomeIcon icon={faArrowUpRightFromSquare} size="xs" />
                  Mở tab mới
                </a>
              </div>

              {/* Iframe container */}
              <div className="w-full rounded-b-xl overflow-hidden border border-zinc-200/50 dark:border-zinc-800/50 bg-zinc-100 dark:bg-zinc-900">
                <iframe
                  src={project.demo}
                  title={`${project.title} — Live Demo`}
                  className="w-full"
                  style={{ height: '700px', border: 'none' }}
                  allow="fullscreen"
                  loading="lazy"
                />
              </div>

              <p className="text-xs text-center text-zinc-400 dark:text-zinc-600 mt-3">
                💡 Demo hoàn toàn tương tác — thử bấm vào các màn hình và nút trong app
              </p>
            </motion.div>
          )}

          {/* ============= OVERVIEW TAB ============= */}
          {(!hasDemo || activeTab === 'overview') && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Meta cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10">
                {[
                  { icon: faCalendar, label: 'Timeline', value: project.timeline },
                  { icon: faCode, label: 'Kiến trúc', value: project.architecture },
                  { icon: faLayerGroup, label: 'Danh mục', value: project.category },
                ]
                  .filter((m) => m.value)
                  .map(({ icon, label, value }) => (
                    <div
                      key={label}
                      className="glass rounded-xl p-4 border border-zinc-200/50 dark:border-zinc-800/50"
                    >
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-1 flex items-center gap-1">
                        <FontAwesomeIcon icon={icon} />
                        {label}
                      </p>
                      <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200 leading-snug">
                        {value}
                      </p>
                    </div>
                  ))}
              </div>

              {/* Technologies */}
              <section className="mb-10">
                <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 mb-4 font-heading">
                  Công nghệ & Công cụ
                </h2>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="default">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </section>

              {/* AdaptEd Persona block */}
              {project.persona && (
                <section className="mb-10">
                  <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 mb-4 font-heading">
                    👥 Người dùng mục tiêu
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {Object.entries(project.persona).map(([key, value]) => (
                      <div
                        key={key}
                        className="glass rounded-xl p-4 border border-zinc-200/50 dark:border-zinc-800/50"
                      >
                        <p className="text-xs font-bold uppercase tracking-wider text-purple-500 dark:text-purple-400 mb-2">
                          {key === 'youth' ? '⚡ Youth Mode' : '🌿 Senior Mode'}
                        </p>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                          {value}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Challenges */}
              {project.challenges?.length > 0 && (
                <section className="mb-10">
                  <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 mb-4 font-heading">
                    ⚡ Thách thức gặp phải
                  </h2>
                  <div className="space-y-3">
                    {project.challenges.map((c, i) => (
                      <div
                        key={i}
                        className="flex gap-3 glass rounded-xl p-4 border border-zinc-200/50 dark:border-zinc-800/50"
                      >
                        <span className="text-purple-500 font-bold text-sm shrink-0">
                          {String(i + 1).padStart(2, '0')}.
                        </span>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                          {c}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Lessons */}
              {project.lessons?.length > 0 && (
                <section className="mb-10">
                  <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 mb-4 font-heading">
                    💡 Bài học rút ra
                  </h2>
                  <div className="space-y-3">
                    {project.lessons.map((l, i) => (
                      <div
                        key={i}
                        className="flex gap-3 glass rounded-xl p-4 border-l-2 border-purple-500/40 border border-zinc-200/50 dark:border-zinc-800/50"
                      >
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                          {l}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Extra info for AdaptEd */}
              {project.screens && (
                <div className="glass rounded-xl p-5 border border-purple-500/20 bg-purple-500/5 dark:bg-purple-500/10 flex items-center gap-4 mb-10">
                  <span className="text-3xl font-extrabold text-purple-500">{project.screens}</span>
                  <div>
                    <p className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm">
                      Màn hình thiết kế
                    </p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-500">
                      Bao gồm UI Kit Grid & Live App Emulator
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom navigation */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="pt-8 border-t border-zinc-200/60 dark:border-zinc-800/60 flex justify-between items-center"
        >
          <Link
            to="/projects"
            className="text-sm text-zinc-500 hover:text-purple-500 transition-colors flex items-center gap-2"
          >
            <FontAwesomeIcon icon={faArrowLeft} size="xs" />
            Dự án khác
          </Link>
          <a
            href="mailto:tranvuuyenmy0305@gmail.com"
            className="text-sm font-medium text-purple-500 hover:text-purple-400 transition-colors"
          >
            Liên hệ hợp tác →
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
}

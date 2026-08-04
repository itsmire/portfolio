import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faEnvelope, faGraduationCap, faBriefcase, faCode } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { staggerContainer, fadeUp, slideLeft } from '../../utils/animationVariants';
import SectionTitle from '../../components/SectionTitle';
import Badge from '../../components/Badge';
import { EDUCATION, EXPERIENCES } from '../../data/experience';
import { SKILLS } from '../../data/skills';
import { SOCIAL_LINKS } from '../../constants';

export default function Resume() {
  const skillCategories = Object.values(SKILLS);

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="py-16 px-4 sm:px-6 max-w-4xl mx-auto"
    >
      {/* Header */}
      <motion.div variants={fadeUp} className="text-center mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-zinc-200/60 dark:border-zinc-700/60 text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Đang tìm kiếm vị trí thực tập 2026
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-zinc-50 mb-3 font-heading">
          Trần Vũ Uyên My
        </h1>
        <p className="text-lg text-purple-500 dark:text-purple-400 font-medium mb-6">
          Kỹ sư Phần mềm & Full-stack Developer
        </p>
        <p className="text-base text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto leading-relaxed">
          Sinh viên năm cuối tại IUH TP.HCM. Đam mê xây dựng sản phẩm web đẹp,
          hiệu năng cao và trải nghiệm người dùng tốt.
        </p>

        {/* Action buttons */}
        <div className="flex flex-wrap justify-center gap-3 mt-8">
          <a
            href="/resume.pdf"
            download
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-purple-600 hover:bg-purple-500 text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-purple-500/25"
          >
            <FontAwesomeIcon icon={faDownload} size="xs" />
            Tải CV (PDF)
          </a>
          <a
            href={`mailto:${SOCIAL_LINKS.email}`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium glass border border-zinc-200/60 dark:border-zinc-700/60 text-zinc-800 dark:text-zinc-100 hover:border-purple-500/30 transition-all duration-300 hover:-translate-y-0.5"
          >
            <FontAwesomeIcon icon={faEnvelope} size="xs" />
            Liên hệ qua Email
          </a>
          <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium glass border border-zinc-200/60 dark:border-zinc-700/60 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:border-zinc-400/30 transition-all duration-300 hover:-translate-y-0.5">
            <FontAwesomeIcon icon={faGithub} />
            GitHub
          </a>
          <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium glass border border-zinc-200/60 dark:border-zinc-700/60 text-zinc-600 dark:text-zinc-400 hover:text-blue-500 hover:border-blue-500/30 transition-all duration-300 hover:-translate-y-0.5">
            <FontAwesomeIcon icon={faLinkedin} />
            LinkedIn
          </a>
        </div>
      </motion.div>

      {/* Education */}
      <motion.section variants={fadeUp} className="mb-12">
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-6 font-heading flex items-center gap-2">
          <FontAwesomeIcon icon={faGraduationCap} className="text-purple-500" />
          Học vấn
        </h2>
        <div className="space-y-4">
          {EDUCATION.map((edu) => (
            <div key={edu.id} className="glass rounded-2xl p-6 border border-zinc-200/50 dark:border-zinc-800/50">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                <div>
                  <h3 className="font-bold text-zinc-900 dark:text-zinc-100">{edu.degree}</h3>
                  <p className="text-sm text-purple-500 dark:text-purple-400 font-medium">{edu.school}</p>
                  {edu.faculty && <p className="text-xs text-zinc-500 dark:text-zinc-500">{edu.faculty}</p>}
                </div>
                <div className="text-right">
                  <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 glass px-3 py-1 rounded-full border border-zinc-200/50 dark:border-zinc-800/50">
                    {edu.period}
                  </span>
                  <p className="text-xs text-zinc-400 mt-1">{edu.location}</p>
                </div>
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">{edu.description}</p>
              {edu.highlights && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-2">Môn chuyên ngành nổi bật</p>
                  <div className="flex flex-wrap gap-2">
                    {edu.highlights.map((h) => (
                      <Badge key={h} variant="muted">{h}</Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </motion.section>

      {/* Experience */}
      {EXPERIENCES.length > 0 && (
        <motion.section variants={fadeUp} className="mb-12">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-6 font-heading flex items-center gap-2">
            <FontAwesomeIcon icon={faBriefcase} className="text-purple-500" />
            Kinh nghiệm
          </h2>
          <div className="space-y-4">
            {EXPERIENCES.map((exp) => (
              <div key={exp.id} className="glass rounded-2xl p-6 border border-zinc-200/50 dark:border-zinc-800/50">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-zinc-900 dark:text-zinc-100">{exp.role}</h3>
                      {exp.current && (
                        <span className="text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/20">Hiện tại</span>
                      )}
                    </div>
                    <p className="text-sm text-purple-500 dark:text-purple-400 font-medium">{exp.company}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 glass px-3 py-1 rounded-full border border-zinc-200/50 dark:border-zinc-800/50">
                      {exp.period}
                    </span>
                    <p className="text-xs text-zinc-400 mt-1">{exp.location}</p>
                  </div>
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-3">{exp.description}</p>
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((t) => (
                    <Badge key={t} variant="muted">{t}</Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.section>
      )}

      {/* Skills summary */}
      <motion.section variants={fadeUp}>
        <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-6 font-heading flex items-center gap-2">
          <FontAwesomeIcon icon={faCode} className="text-purple-500" />
          Kỹ năng chuyên môn
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {skillCategories.map((cat) => (
            <div key={cat.label} className="glass rounded-2xl p-5 border border-zinc-200/50 dark:border-zinc-800/50">
              <p className="font-semibold text-zinc-900 dark:text-zinc-100 text-sm mb-3 flex items-center gap-1.5">
                <span>{cat.icon}</span>
                {cat.label}
              </p>
              <div className="flex flex-wrap gap-2">
                {cat.items.map(({ name }) => (
                  <Badge key={name} variant="muted">{name}</Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.section>
    </motion.div>
  );
}

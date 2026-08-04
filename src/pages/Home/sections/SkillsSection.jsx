import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import { staggerContainer, fadeUp } from '../../../utils/animationVariants';
import SectionTitle from '../../../components/SectionTitle';
import { SKILLS } from '../../../data/skills';
import Badge from '../../../components/Badge';

export default function SkillsSection() {
  const categories = Object.keys(SKILLS);

  const educationHighlights = [
    "Kiến trúc phần mềm",
    "Lập trình phân tán",
    "QA/QC",
    "Phân tích thiết kế hệ thống",
    "Hệ CSDL NoSQL/SQL"
  ];

  return (
    <section id="skills-education" className="py-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <SectionTitle
          eyebrow="Năng lực & Học vấn"
          title="Kỹ năng chuyên môn & Nền tảng học tập"
          subtitle="Tổng hợp kỹ năng lập trình thực tế kết hợp nền tảng đào tạo Kỹ sư tại IUH."
          center
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-12">
          {/* Left Column - Skills (8/12 width on large screens) */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-5"
          >
            {categories.map((key) => {
              const cat = SKILLS[key];
              return (
                <motion.div
                  key={key}
                  variants={fadeUp}
                  className="glass rounded-2xl p-5 border border-zinc-200/50 dark:border-zinc-800/50 hover:border-purple-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/5"
                >
                  <div className="flex items-center gap-2 mb-3.5 pb-2 border-b border-zinc-200/40 dark:border-zinc-800/40">
                    <span className="text-base">{cat.icon}</span>
                    <h3 className="font-bold text-sm text-zinc-900 dark:text-zinc-50 font-heading">
                      {cat.label}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {cat.items.map(({ name }) => (
                      <span
                        key={name}
                        className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-zinc-100 dark:bg-zinc-900/60 border border-zinc-200/60 dark:border-zinc-800/80 text-zinc-700 dark:text-zinc-300 hover:border-purple-500/30 dark:hover:border-purple-500/40 transition-colors"
                      >
                        {name}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Right Column - Education Card (4/12 width on large screens) */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="lg:col-span-4"
          >
            <motion.div
              variants={fadeUp}
              className="glass rounded-2xl p-6 border border-zinc-200/60 dark:border-zinc-800/60 hover:border-purple-500/30 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-purple-500/5 relative overflow-hidden"
            >
              {/* Decorative top colored border */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-indigo-500" />

              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-8 h-8 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center text-sm">
                  <FontAwesomeIcon icon={faGraduationCap} />
                </div>
                <h3 className="font-bold text-base text-zinc-900 dark:text-zinc-50 font-heading">
                  Học vấn
                </h3>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <h4 className="font-bold text-zinc-900 dark:text-zinc-100 text-sm leading-snug">
                    Kỹ sư Kỹ thuật Phần mềm
                  </h4>
                  <p className="text-purple-600 dark:text-purple-400 font-bold mt-1 text-[11px]">
                    Đại học Công nghiệp TP. Hồ Chí Minh (IUH)
                  </p>
                  <p className="text-zinc-400 dark:text-zinc-500 mt-0.5">
                    Khoa Công nghệ thông tin
                  </p>
                </div>

                <div className="flex justify-between items-center bg-zinc-100/50 dark:bg-zinc-900/50 px-3 py-2 rounded-xl border border-zinc-200/40 dark:border-zinc-800/40">
                  <span className="font-medium text-zinc-500 dark:text-zinc-400">Niên khóa</span>
                  <span className="font-bold text-zinc-800 dark:text-zinc-200">2022 – 2026</span>
                </div>

                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-xs">
                  Chương trình đào tạo Kỹ sư hệ 4.5 năm. Tập trung chuyên sâu nghiên cứu kiến trúc hệ thống phần mềm, cơ sở dữ liệu SQL/NoSQL, lập trình phân tán và thiết kế ứng dụng di động/web chuyên nghiệp.
                </p>

                <div className="pt-2 border-t border-zinc-200/40 dark:border-zinc-800/40">
                  <p className="font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider text-[9px] mb-2">
                    Môn chuyên ngành tiêu biểu
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {educationHighlights.map((h) => (
                      <Badge key={h} variant="muted" className="text-[10px] py-1 px-2.5">
                        {h}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faDownload, faArrowDown, faEnvelope, faGraduationCap, faPalette, faCode } from '@fortawesome/free-solid-svg-icons';
import { staggerContainer, fadeUp, fadeIn, scaleIn } from '../../../utils/animationVariants';
import { SOCIAL_LINKS } from '../../../constants';

export default function HeroSection() {
  return (
    <section id="hero" className="relative min-h-[92vh] flex items-center px-4 sm:px-6 py-12 lg:py-0">
      {/* Background glow effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[10%] right-[10%] w-96 h-96 bg-purple-600/10 dark:bg-purple-500/15 rounded-full glow-blur" />
        <div className="absolute bottom-[10%] left-[5%] w-[30rem] h-[30rem] bg-indigo-500/8 dark:bg-indigo-500/12 rounded-full glow-blur" />
      </div>

      <div className="w-full max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column - Main Text & Info */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 flex flex-col justify-center"
          >
            {/* Availability status badge */}
            <motion.div variants={fadeUp} className="flex items-center gap-2 mb-6">
              <span className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold glass border border-purple-500/30 text-purple-600 dark:text-purple-300 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Sinh viên năm cuối IUH — Tìm thực tập 2026</span>
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={fadeUp}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.1] mb-6 font-heading"
            >
              <span className="text-zinc-900 dark:text-zinc-50">Xin chào, tôi là </span>
              <span className="bg-gradient-to-r from-purple-500 via-purple-400 to-indigo-500 bg-clip-text text-transparent block sm:inline">
                Trần Vũ Uyên My
              </span>
              <span className="block mt-2 text-2xl sm:text-3xl md:text-4xl font-bold text-zinc-700 dark:text-zinc-300">
                Frontend Developer & QA Tester
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-base sm:text-lg leading-relaxed mb-8 max-w-2xl text-zinc-600 dark:text-zinc-400"
            >
              Sinh viên năm cuối chuyên ngành Kỹ thuật Phần mềm tại Đại học Công nghiệp TP.HCM (IUH). Chuyên phát triển ứng dụng Frontend mượt mà, kiểm thử chất lượng (QA/QC) và hỗ trợ vận hành Backend.
            </motion.p>

            {/* CTA Buttons & Social Links */}
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3.5 mb-10">
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold bg-purple-600 hover:bg-purple-500 text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-purple-500/25"
              >
                Xem Dự Án
              </Link>
              <a
                href="/resume.pdf"
                download
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold glass border border-zinc-200/60 dark:border-zinc-700/60 text-zinc-800 dark:text-zinc-100 hover:border-purple-500/40 transition-all duration-300 hover:-translate-y-0.5"
              >
                <FontAwesomeIcon icon={faDownload} size="xs" />
                Tải CV
              </a>

              {/* Social icons */}
              <div className="flex items-center gap-2 ml-1">
                <a
                  href={SOCIAL_LINKS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl glass border border-zinc-200/60 dark:border-zinc-700/60 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-100 hover:border-purple-500/40 transition-all duration-300"
                  aria-label="GitHub"
                  title="GitHub Profile"
                >
                  <FontAwesomeIcon icon={faGithub} className="text-base" />
                </a>
                <a
                  href={SOCIAL_LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl glass border border-zinc-200/60 dark:border-zinc-700/60 text-zinc-600 dark:text-zinc-400 hover:text-blue-500 hover:border-blue-500/40 transition-all duration-300"
                  aria-label="LinkedIn"
                  title="LinkedIn Profile"
                >
                  <FontAwesomeIcon icon={faLinkedin} className="text-base" />
                </a>
                <a
                  href={`mailto:${SOCIAL_LINKS.email}`}
                  className="p-3 rounded-xl glass border border-zinc-200/60 dark:border-zinc-700/60 text-zinc-600 dark:text-zinc-400 hover:text-emerald-500 hover:border-emerald-500/40 transition-all duration-300"
                  aria-label="Email"
                  title="Gửi Email"
                >
                  <FontAwesomeIcon icon={faEnvelope} className="text-base" />
                </a>
              </div>
            </motion.div>

            {/* Quick Stats Bar */}
            <motion.div
              variants={fadeUp}
              className="grid grid-cols-3 sm:grid-cols-3 gap-4 pt-6 border-t border-zinc-200/60 dark:border-zinc-800/60"
            >
              {[
                { value: "4", label: "Dự án thực tế" },
                { value: "4.5", label: "Năm học Kỹ sư IUH" },
                { value: "2026", label: "Dự kiến tốt nghiệp" },
              ].map(({ value, label }) => (
                <div key={label}>
                  <p className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-50 font-heading">
                    {value}
                  </p>
                  <p className="text-xs mt-0.5 text-zinc-500 dark:text-zinc-400 font-medium">{label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - Modern Profile Avatar Frame */}
          <motion.div
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            className="lg:col-span-5 flex justify-center items-center"
          >
            <div className="relative w-full max-w-sm sm:max-w-md">
              {/* Outer Glowing Glass Container */}
              <div className="relative rounded-3xl p-3 glass border border-purple-500/30 dark:border-purple-500/20 shadow-2xl shadow-purple-500/10 backdrop-blur-xl group">
                
                {/* Background Ambient Glow */}
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 via-indigo-500/10 to-transparent rounded-3xl blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Main Avatar Image Wrapper */}
                <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-zinc-900 border border-white/10 shadow-inner">
                  <img
                    src="/avatar.jpg"
                    alt="Trần Vũ Uyên My"
                    className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
                  />

                  {/* Gradient Overlay for Text Readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent opacity-80" />

                  {/* Bottom Profile Info Tag inside Photo */}
                  <div className="absolute bottom-4 left-4 right-4 z-10">
                    <div className="glass p-3 rounded-xl border border-white/15 backdrop-blur-md flex items-center justify-between">
                      <div>
                        <p className="text-xs font-bold text-white font-heading">Trần Vũ Uyên My</p>
                        <p className="text-[10px] text-purple-300 font-medium flex items-center gap-1 mt-0.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          TP. Hồ Chí Minh, Việt Nam 🇻🇳
                        </p>
                      </div>
                      <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-purple-500/30 text-purple-200 border border-purple-400/30">
                        IUH 2022-2026
                      </span>
                    </div>
                  </div>
                </div>

                {/* Floating Badge 1 - Top Right */}
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  className="absolute -top-4 -right-4 glass px-3.5 py-2 rounded-2xl border border-purple-500/40 shadow-xl backdrop-blur-md flex items-center gap-2.5 z-20"
                >
                  <div className="w-7 h-7 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center text-xs">
                    <FontAwesomeIcon icon={faCode} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-zinc-900 dark:text-zinc-100 font-heading">Frontend Dev</p>
                    <p className="text-[9px] text-zinc-500 dark:text-zinc-400">React, Tailwind & JS/TS</p>
                  </div>
                </motion.div>

                {/* Floating Badge 2 - Bottom Left */}
                <motion.div
                  animate={{ y: [0, 6, 0] }}
                  transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 0.5 }}
                  className="absolute -bottom-4 -left-4 glass px-3.5 py-2 rounded-2xl border border-indigo-500/40 shadow-xl backdrop-blur-md flex items-center gap-2.5 z-20"
                >
                  <div className="w-7 h-7 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-xs">
                    <FontAwesomeIcon icon={faPalette} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-zinc-900 dark:text-zinc-100 font-heading">QA / QC Tester</p>
                    <p className="text-[9px] text-zinc-500 dark:text-zinc-400">Test Cases & Bug Tracking</p>
                  </div>
                </motion.div>

              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-1.5 text-zinc-400 dark:text-zinc-600"
      >
        <span className="text-[10px] tracking-widest uppercase font-medium">Cuộn để khám phá</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <FontAwesomeIcon icon={faArrowDown} size="xs" />
        </motion.div>
      </motion.div>
    </section>
  );
}

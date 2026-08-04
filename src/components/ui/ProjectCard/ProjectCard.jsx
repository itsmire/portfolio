import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faFigma } from '@fortawesome/free-brands-svg-icons';
import { faArrowUpRightFromSquare, faLayerGroup, faMobileScreen, faLaptopCode, faStar } from '@fortawesome/free-solid-svg-icons';
import { fadeUp } from "../../../utils/animationVariants";
import Badge from "../../Badge";

/**
 * ProjectCard component - Hiển thị thông tin dự án dạng card với Preview Visual Banner.
 */
export default function ProjectCard({ project, index = 0 }) {
  const { id, title, subtitle, description, technologies, github, demo, figma, category, thumbnail } = project;

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.08 }}
      className="group glass rounded-2xl overflow-hidden flex flex-col h-full border border-zinc-200/50 dark:border-zinc-800/50 hover:border-purple-500/30 dark:hover:border-purple-500/30 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-purple-500/10"
    >
      {/* Visual Preview Banner */}
      <Link to={`/projects/${id}`} className="relative w-full h-48 overflow-hidden bg-zinc-900/90 block">
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : id === 'adapted-english-learning' ? (
          /* Preview Banner độc quyền cho AdaptEd App */
          <div className="w-full h-full bg-gradient-to-br from-purple-900/80 via-zinc-900 to-indigo-950 p-4 flex flex-col justify-between relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
            {/* Ambient Lighting */}
            <div className="absolute top-[-20%] right-[-10%] w-36 h-36 bg-purple-500/30 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute bottom-[-20%] left-[-10%] w-36 h-36 bg-indigo-500/20 rounded-full blur-2xl pointer-events-none" />

            {/* Top Bar */}
            <div className="flex items-center justify-between z-10">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30 backdrop-blur-md">
                <FontAwesomeIcon icon={faMobileScreen} className="text-purple-400" />
                Mobile App UI/UX
              </span>
              <span className="text-[10px] font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live Demo sẵn sàng
              </span>
            </div>

            {/* Mini Mockup Visual */}
            <div className="my-auto z-10 flex items-center justify-center gap-4">
              {/* Mockup Frame 1 */}
              <div className="w-24 h-28 glass rounded-xl border border-white/10 p-2 shadow-xl transform -rotate-3 group-hover:rotate-0 transition-transform duration-300 bg-zinc-950/60 backdrop-blur-md flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <div className="w-6 h-1.5 bg-purple-500/40 rounded-full" />
                  <div className="w-2 h-2 rounded-full bg-purple-400/50" />
                </div>
                <div className="space-y-1 my-auto">
                  <div className="text-[9px] font-bold text-purple-300">Youth Mode</div>
                  <div className="w-full h-1 bg-purple-500/30 rounded" />
                  <div className="w-3/4 h-1 bg-purple-500/20 rounded" />
                </div>
                <div className="w-full py-1 bg-purple-600/80 rounded text-[7px] text-center text-white font-semibold">Start Test</div>
              </div>

              {/* Mockup Frame 2 */}
              <div className="w-28 h-32 glass rounded-xl border border-purple-500/30 p-2.5 shadow-2xl z-10 group-hover:scale-105 transition-transform duration-300 bg-zinc-950/80 backdrop-blur-lg flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-[8px] font-bold text-white tracking-wider">AdaptEd AI</span>
                  <FontAwesomeIcon icon={faStar} className="text-amber-400 text-[9px]" />
                </div>
                <div className="space-y-1.5 my-auto text-center">
                  <div className="w-8 h-8 mx-auto rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500 p-0.5 flex items-center justify-center">
                    <span className="text-xs">🎓</span>
                  </div>
                  <div className="text-[9px] font-extrabold text-zinc-100 font-heading">AI Curriculum</div>
                </div>
                <div className="w-full py-1 bg-gradient-to-r from-purple-500 to-indigo-500 rounded text-[8px] text-center text-white font-bold">17 Screens</div>
              </div>
            </div>

            {/* Hover overlay hint */}
            <div className="absolute inset-0 bg-purple-950/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
              <span className="px-4 py-2 rounded-xl text-xs font-semibold bg-white text-zinc-900 shadow-xl flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                Bấm để xem & dùng thử App →
              </span>
            </div>
          </div>
        ) : id === 'core-ecommerce' ? (
          /* Preview Banner độc quyền cho CORE E-commerce Web App */
          <div className="w-full h-full bg-gradient-to-br from-zinc-900 via-zinc-950 to-black p-4 flex flex-col justify-between relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
            {/* Ambient Purple glow */}
            <div className="absolute top-[-10%] left-[-10%] w-32 h-32 bg-[#ff3b30]/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />

            {/* Top Bar */}
            <div className="flex items-center justify-between z-10">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-zinc-800/40 text-zinc-300 border border-zinc-700/30">
                <FontAwesomeIcon icon={faLaptopCode} className="text-[#ff3b30]" />
                Web Microservices Platform
              </span>
              <span className="text-[10px] font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live Demo sẵn sàng
              </span>
            </div>

            {/* Mini Browser Mockup Visual */}
            <div className="my-auto z-10 flex justify-center w-full px-2 mt-2">
              <div className="w-[85%] h-24 bg-white rounded-t-lg border border-zinc-200 shadow-xl overflow-hidden flex flex-col">
                {/* Browser address bar */}
                <div className="h-4 bg-zinc-100 border-b border-zinc-200 flex items-center px-2 gap-1 justify-between">
                  <div className="flex gap-1 shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400/80" />
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-400/80" />
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400/80" />
                  </div>
                  <div className="bg-white rounded px-2 w-[70%] h-3 flex items-center justify-center">
                    <span className="text-[6px] text-zinc-400 scale-90 select-none">core-frontend-28dw.vercel.app</span>
                  </div>
                  <div className="w-4" />
                </div>
                {/* Browser body layout */}
                <div className="p-2 flex-1 flex flex-col bg-[#f9f9fb] justify-between">
                  {/* Mini header */}
                  <div className="flex justify-between items-center border-b border-zinc-200 pb-1">
                    <span className="text-[7px] font-mono font-black text-black">C O R E</span>
                    <div className="flex gap-1">
                      <span className="w-4 h-1 bg-zinc-200 rounded-sm" />
                      <span className="w-4 h-1 bg-zinc-200 rounded-sm" />
                    </div>
                  </div>
                  {/* Mini Split Hero content */}
                  <div className="flex-1 flex items-center justify-between pt-1 gap-2">
                    <div className="space-y-0.5">
                      <div className="text-[9px] font-black text-black leading-none font-sans uppercase">THIẾT BỊ CÔNG NGHỆ</div>
                      <div className="w-12 h-1 bg-[#ff3b30] rounded-sm" />
                    </div>
                    <div className="w-[30%] h-12 bg-white border border-zinc-200 rounded shadow-sm flex items-center justify-center relative overflow-hidden">
                      <img src="/images/hero-banner.png" alt="Hero" className="w-full h-full object-cover" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Hover overlay hint */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
              <span className="px-4 py-2 rounded-xl text-xs font-semibold bg-white text-zinc-900 shadow-xl flex items-center gap-1.5">
                Bấm để xem & dùng thử Web →
              </span>
            </div>
          </div>
        ) : id === 'pharmacy-management' ? (
          /* Preview Banner độc quyền cho Pharmacy Management System */
          <div className="w-full h-full bg-gradient-to-br from-emerald-950 via-zinc-900 to-zinc-950 p-4 flex flex-col justify-between relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
            {/* Ambient Emerald glow */}
            <div className="absolute top-[-10%] right-[-10%] w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

            {/* Top Bar */}
            <div className="flex items-center justify-between z-10">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-zinc-800/40 text-zinc-300 border border-zinc-700/30">
                <FontAwesomeIcon icon={faLaptopCode} className="text-emerald-400" />
                POS & Inventory App
              </span>
            </div>

            {/* Mini Dashboard Mockup Visual */}
            <div className="my-auto z-10 flex justify-center w-full px-2 mt-2">
              <div className="w-[85%] h-24 bg-white rounded-t-lg border border-zinc-200 shadow-xl overflow-hidden flex flex-col">
                {/* Browser address bar */}
                <div className="h-4 bg-zinc-100 border-b border-zinc-200 flex items-center px-2 gap-1 justify-between">
                  <div className="flex gap-1 shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400/80" />
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-400/80" />
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400/80" />
                  </div>
                  <div className="bg-white rounded px-2 w-[70%] h-3 flex items-center justify-center">
                    <span className="text-[6px] text-zinc-400 scale-90 select-none">pharmacy-management.netlify.app</span>
                  </div>
                  <div className="w-4" />
                </div>
                {/* Browser body layout */}
                <div className="p-2 flex-1 flex flex-col bg-[#fafbfe] justify-between font-sans">
                  {/* Mini header */}
                  <div className="flex justify-between items-center border-b border-zinc-200 pb-1">
                    <span className="text-[7px] font-extrabold text-emerald-600">PHARMACY POS</span>
                    <span className="text-[6px] bg-emerald-100 text-emerald-800 px-1 rounded-sm">QUẦN BÁN LẺ</span>
                  </div>
                  {/* Mini Dashboard Content */}
                  <div className="flex-1 grid grid-cols-3 gap-1 pt-1.5">
                    <div className="bg-emerald-50 border border-emerald-100 rounded p-0.5 flex flex-col justify-center items-center">
                      <span className="text-[8px] font-bold text-emerald-700">142</span>
                      <span className="text-[5px] text-zinc-400 scale-90 font-medium">Tồn kho</span>
                    </div>
                    <div className="bg-red-50 border border-red-100 rounded p-0.5 flex flex-col justify-center items-center">
                      <span className="text-[8px] font-bold text-red-600">3</span>
                      <span className="text-[5px] text-zinc-400 scale-90 font-medium">Hết hạn</span>
                    </div>
                    <div className="bg-blue-50 border border-blue-100 rounded p-0.5 flex flex-col justify-center items-center">
                      <span className="text-[8px] font-bold text-blue-600">48</span>
                      <span className="text-[5px] text-zinc-400 scale-90 font-medium">Đơn hàng</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Hover overlay hint */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
              <span className="px-4 py-2 rounded-xl text-xs font-semibold bg-white text-zinc-900 shadow-xl flex items-center gap-1.5">
                Bấm để xem chi tiết →
              </span>
            </div>
          </div>
        ) : (
          /* Generic Banner cho các dự án Web App khác */
          <div className="w-full h-full bg-gradient-to-br from-zinc-800 via-zinc-900 to-zinc-950 p-4 flex flex-col justify-between relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
            <div className="flex items-center justify-between z-10">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-zinc-700/40 text-zinc-300 border border-zinc-600/30">
                <FontAwesomeIcon icon={faLaptopCode} className="text-purple-400" />
                {category || "Web App"}
              </span>
            </div>

            <div className="my-auto text-center z-10">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-zinc-800/80 border border-zinc-700/50 flex items-center justify-center text-xl mb-2 text-purple-400">
                ⚡
              </div>
              <p className="text-xs font-bold text-zinc-300 font-heading">{title}</p>
            </div>

            {/* Hover overlay hint */}
            <div className="absolute inset-0 bg-zinc-950/70 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
              <span className="px-4 py-2 rounded-xl text-xs font-semibold bg-white text-zinc-900 shadow-xl flex items-center gap-1.5">
                Xem chi tiết Case Study →
              </span>
            </div>
          </div>
        )}
      </Link>

      {/* Card Content Body */}
      <div className="p-6 flex flex-col flex-1">
        {/* Category Tag */}
        {category && (
          <span className="text-[10px] font-bold uppercase tracking-widest text-purple-500 dark:text-purple-400 mb-2 block">
            <FontAwesomeIcon icon={faLayerGroup} className="mr-1" />
            {category}
          </span>
        )}

        <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 mb-1 font-heading group-hover:text-purple-500 dark:group-hover:text-purple-400 transition-colors">
          <Link to={`/projects/${id}`}>{title}</Link>
        </h3>
        <p className="text-xs text-purple-500 dark:text-purple-400 mb-3 font-medium">{subtitle}</p>
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 mb-5 flex-1 line-clamp-3">
          {description}
        </p>

        {/* Tech badges */}
        <div className="flex flex-wrap gap-2 mb-5">
          {technologies.slice(0, 4).map((tech) => (
            <Badge key={tech} variant="muted">{tech}</Badge>
          ))}
          {technologies.length > 4 && (
            <Badge variant="muted">+{technologies.length - 4}</Badge>
          )}
        </div>

        {/* Link hành động */}
        <div className="flex items-center justify-between pt-4 border-t border-zinc-200/50 dark:border-zinc-800/50">
          <Link
            to={`/projects/${id}`}
            className="text-sm font-semibold text-purple-600 hover:text-purple-500 dark:text-purple-400 dark:hover:text-purple-300 transition-colors duration-200 flex items-center gap-1"
          >
            Case Study & Live Demo →
          </Link>
          <div className="flex items-center gap-2">
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors duration-200"
                aria-label="GitHub"
                title="Xem mã nguồn GitHub"
              >
                <FontAwesomeIcon icon={faGithub} />
              </a>
            )}
            {figma && (
              <a
                href={figma}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg text-zinc-400 hover:text-pink-500 dark:hover:text-pink-400 transition-colors duration-200"
                aria-label="Figma"
                title="Xem bản vẽ Figma"
              >
                <FontAwesomeIcon icon={faFigma} />
              </a>
            )}
            {demo && (
              <a
                href={demo}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg text-zinc-400 hover:text-purple-500 dark:hover:text-purple-400 transition-colors duration-200"
                aria-label="Live Demo"
                title="Mở Demo trang riêng"
              >
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} size="sm" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

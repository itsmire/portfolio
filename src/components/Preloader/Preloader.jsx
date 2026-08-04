import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * ============================================================================
 * CẤU HÌNH YÊU CẦU TRƯỚC KHI DÙNG (React Version):
 * 1. Cần cài đặt thư viện 'framer-motion' và '@fortawesome/react-fontawesome'.
 * 2. Đảm bảo Tailwind CSS đã được cấu hình hoạt động trong dự án.
 * 3. File avatar chân dung được lưu trữ tại đường dẫn public/avatar.jpg (nếu dùng).
 * ============================================================================
 */

// ---------------------------------------------------------------------------
// HẰNG SỐ CẤU HÌNH DỮ LIỆU CÁ NHÂN HÓA (Dễ dàng thay đổi thông tin)
// ---------------------------------------------------------------------------
const DEVELOPER_NAME = 'Mire';
const DEVELOPER_ROLE = 'Software Engineer';
const TERMINAL_WELCOME_MSG = `Welcome, ${DEVELOPER_NAME}`;
const FOOTER_LABEL = `SYSTEM DEVELOPER • ${DEVELOPER_NAME.toUpperCase()} PORTFOLIO 2026`;

const BOOT_COMMANDS = [
  '> Initializing system...',
  '> Loading portfolio modules...',
  `> ${TERMINAL_WELCOME_MSG}`,
];

// ---------------------------------------------------------------------------
// HẰNG SỐ CẤU HÌNH HIỆU ỨNG & THỜI GIAN (Gom magic numbers thành constant)
// ---------------------------------------------------------------------------
const TOTAL_LOAD_TIME = 2500;   // Thời gian nạp progress bar (2.5 giây)
const INTERVAL_TIME = 25;       // Tốc độ lặp cập nhật tiến trình (ms)
const TYPING_DELAY_BASE = 400;  // Độ trễ cơ sở giữa các dòng terminal (ms)
const CANVAS_GRID_SIZE = 45;    // Kích thước ô lưới không gian (grid size)
const CANVAS_PARTICLES = 45;    // Số lượng hạt particle trôi nổi

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [typedLines, setTypedLines] = useState([]);
  const [lineIndex, setLineIndex] = useState(0);
  const [isDone, setIsDone] = useState(false);
  
  const canvasRef = useRef(null);
  const animFrameRef = useRef(null); // Lưu trữ animation frame để tránh leak memory

  // Kiểm tra xem người dùng có bật chế độ giảm chuyển động (prefers-reduced-motion)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Kiểm tra media query cho accessibility
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    // Kích hoạt ngay nếu chế độ Accessibility giảm chuyển động được bật
    if (mediaQuery.matches) {
      setProgress(100);
      setTypedLines(BOOT_COMMANDS);
      const timer = setTimeout(() => {
        setIsDone(true);
        if (onComplete) onComplete();
      }, 300); // Rút ngắn toàn bộ preloader xuống 0.3s
      return () => clearTimeout(timer);
    }
  }, [onComplete]);

  // ---------------------------------------------------------------------------
  // 1. TIẾN TRÌNH PROGRESS BAR (Đồng bộ % chạy)
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (prefersReducedMotion) return;

    const step = 100 / (TOTAL_LOAD_TIME / INTERVAL_TIME);
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsDone(true);
            setTimeout(() => {
              if (onComplete) onComplete();
            }, 600);
          }, 200);
          return 100;
        }
        return Math.min(prev + step, 100);
      });
    }, INTERVAL_TIME);

    return () => clearInterval(timer);
  }, [onComplete, prefersReducedMotion]);

  // ---------------------------------------------------------------------------
  // 2. HIỆU ỨNG GÕ CHỮ TERMINAL
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (prefersReducedMotion) return;

    if (lineIndex < BOOT_COMMANDS.length) {
      const delay = lineIndex === 2 ? TYPING_DELAY_BASE + 100 : TYPING_DELAY_BASE;
      const timer = setTimeout(() => {
        setTypedLines((prev) => [...prev, BOOT_COMMANDS[lineIndex]]);
        setLineIndex((prev) => prev + 1);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [lineIndex, prefersReducedMotion]);

  // ---------------------------------------------------------------------------
  // 3. CANVAS NỀN: HIỆU ỨNG LƯỚI GRID & HẠT PARTICLES (Có sửa CPU/Memory Leak)
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (prefersReducedMotion || isDone) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Lắng nghe và cập nhật kích thước Canvas khi người dùng resize cửa sổ
    const handleResize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.width = window.innerWidth;
        height = canvasRef.current.height = window.innerHeight;
      }
    };
    window.addEventListener('resize', handleResize, { passive: true });

    // Khởi tạo các hạt particles
    const particles = Array.from({ length: CANVAS_PARTICLES }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      radius: 1 + Math.random() * 1.5,
      alpha: 0.2 + Math.random() * 0.5,
    }));

    const render = () => {
      // Dừng vẽ nếu Preloader đã ẩn xong
      if (isDone) {
        if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Vẽ lưới Grid
      ctx.strokeStyle = 'rgba(0, 229, 255, 0.04)';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += CANVAS_GRID_SIZE) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += CANVAS_GRID_SIZE) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Di chuyển và vẽ hạt Particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.fillStyle = '#00E5FF';
        ctx.globalAlpha = p.alpha;
        ctx.shadowColor = '#00E5FF';
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    // Dọn dẹp listener và huỷ frame khi component unmount để tránh Memory Leak
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isDone, prefersReducedMotion]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          key="tech-cyber-preloader"
          initial={{ opacity: 1, y: 0 }}
          exit={{
            opacity: 0,
            y: '-100%',
            transition: { duration: prefersReducedMotion ? 0.3 : 0.6, ease: [0.16, 1, 0.3, 1] },
          }}
          className="fixed inset-0 z-[99999] bg-[#070709] text-[#FAFAFA] flex flex-col items-center justify-center px-6 overflow-hidden select-none font-mono"
        >
          {/* Ambient Glow phông nền */}
          {!prefersReducedMotion && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] bg-[#00E5FF]/8 rounded-full blur-[130px] pointer-events-none" />
          )}

          {/* Canvas lưới tọa độ */}
          {!prefersReducedMotion && <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />}

          {/* Khung nội dung trung tâm */}
          <div className="relative z-10 flex flex-col items-center justify-center max-w-md w-full text-center">

            {/* LOGO SVG VẼ VIỀN (SVG STROKE DRAW ANIMATION) */}
            <div className="w-24 h-24 mb-6 relative flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
                {/* Lục giác ngoài */}
                <motion.polygon
                  points="50 5, 90 25, 90 75, 50 95, 10 75, 10 25"
                  stroke="#00E5FF"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: prefersReducedMotion ? 0.3 : 1.5, ease: 'easeInOut' }}
                />
                {/* Chữ M ở trung tâm */}
                <motion.path
                  d="M28 65 V35 L50 55 L72 35 V65"
                  stroke="#10B981"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: prefersReducedMotion ? 0.2 : 1.2, delay: prefersReducedMotion ? 0.1 : 0.5, ease: 'easeInOut' }}
                />
              </svg>
            </div>

            {/* CONSOLE TERMINAL (GÕ CHỮ) */}
            <div className="glass p-4 rounded-xl border border-white/10 bg-zinc-950/80 shadow-2xl w-full text-left space-y-1.5 text-xs sm:text-sm mb-6">
              {typedLines.map((line, idx) => (
                <motion.p
                  key={idx}
                  initial={prefersReducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={
                    idx === 2
                      ? 'text-[#10B981] font-bold drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]'
                      : 'text-[#00E5FF]'
                  }
                >
                  {line}
                </motion.p>
              ))}

              {/* Con trỏ gõ lệnh */}
              {!prefersReducedMotion && (
                <div className="flex items-center gap-1 text-[#00E5FF] pt-0.5">
                  <span className="text-zinc-500">&gt;</span>
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ repeat: Infinity, duration: 0.4 }}
                    className="w-1.5 h-3.5 bg-[#00E5FF] inline-block shadow-[0_0_8px_#00E5FF]"
                  />
                </div>
              )}
            </div>

            {/* PROGRESS BAR & % */}
            <div className="w-full space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-zinc-400 font-mono">
                <span className="text-[#00E5FF]">SYSTEM_BOOTING</span>
                <span className="text-[#10B981]">{Math.round(progress)}%</span>
              </div>

              <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden border border-white/10 p-[1px]">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#00E5FF] via-[#10B981] to-[#A855F7] rounded-full shadow-[0_0_10px_#00E5FF]"
                  style={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
            </div>

          </div>

          {/* Footer cố định nhãn nhát quán */}
          <div className="absolute bottom-6 text-[10px] uppercase tracking-widest text-zinc-500 font-mono">
            {FOOTER_LABEL}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

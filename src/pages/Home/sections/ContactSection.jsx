import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLocationDot, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin, faFigma } from '@fortawesome/free-brands-svg-icons';
import { staggerContainer, fadeUp } from '../../../utils/animationVariants';
import SectionTitle from '../../../components/SectionTitle';
import { SOCIAL_LINKS } from '../../../constants';

const contactLinks = [
  {
    icon: faEnvelope,
    label: "Email",
    value: "tranvuuyenmy0305@gmail.com",
    href: "mailto:tranvuuyenmy0305@gmail.com",
    color: "hover:text-emerald-500 hover:border-emerald-500/30",
  },
  {
    icon: faGithub,
    label: "GitHub",
    value: "github.com/uyenmyyy",
    href: SOCIAL_LINKS.github,
    color: "hover:text-zinc-900 dark:hover:text-zinc-100 hover:border-zinc-400/30",
  },
  {
    icon: faLinkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/my-trần-vũ-uyên-796047370",
    href: SOCIAL_LINKS.linkedin,
    color: "hover:text-blue-500 hover:border-blue-500/30",
  },
  {
    icon: faFigma,
    label: "Figma",
    value: "Xem các thiết kế UI/UX",
    href: "#",
    color: "hover:text-pink-500 hover:border-pink-500/30",
  },
];

export default function ContactSection() {
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Gửi bằng mailto link
    const subject = encodeURIComponent(`[Portfolio] Liên hệ từ ${form.name}`);
    const body = encodeURIComponent(`Tên: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
    window.open(`mailto:tranvuuyenmy0305@gmail.com?subject=${subject}&body=${body}`);
    setSent(true);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("tranvuuyenmy0305@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <SectionTitle
          eyebrow="Liên Hệ"
          title="Cùng hợp tác nhé!"
          subtitle="Tôi đang tìm kiếm cơ hội thực tập và sẵn sàng lắng nghe các dự án thú vị. Hãy liên hệ với tôi!"
          center
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Contact cards */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-3"
          >
            <motion.div variants={fadeUp} className="glass rounded-xl p-4 border border-zinc-200/50 dark:border-zinc-800/50 flex items-center gap-3">
              <div className="p-2 bg-purple-500/10 rounded-lg">
                <FontAwesomeIcon icon={faLocationDot} className="text-purple-500 text-sm" />
              </div>
              <div>
                <p className="text-xs text-zinc-400 dark:text-zinc-500">Vị trí</p>
                <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">TP. Hồ Chí Minh, Việt Nam</p>
              </div>
            </motion.div>

            {contactLinks.map(({ icon, label, value, href, color }) => (
              <motion.a
                key={label}
                variants={fadeUp}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className={`glass rounded-xl p-4 border border-zinc-200/50 dark:border-zinc-800/50 flex items-center gap-3 transition-all duration-300 group ${color}`}
              >
                <div className="p-2 bg-zinc-100 dark:bg-zinc-900/50 group-hover:bg-current/10 rounded-lg transition-colors duration-300">
                  <FontAwesomeIcon icon={icon} className="text-zinc-500 group-hover:text-current text-sm transition-colors duration-300" />
                </div>
                <div>
                  <p className="text-xs text-zinc-400 dark:text-zinc-500">{label}</p>
                  <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">{value}</p>
                </div>
              </motion.a>
            ))}
          </motion.div>

          {/* Contact form */}
          <motion.form
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="lg:col-span-3 glass rounded-2xl p-6 border border-zinc-200/50 dark:border-zinc-800/50 space-y-4"
          >
            {sent ? (
              <div className="flex flex-col items-center justify-center py-6 text-center gap-4">
                <div className="text-4xl">🎉</div>
                <p className="font-semibold text-zinc-900 dark:text-zinc-50">Đang soạn thư liên hệ...</p>
                <p className="text-xs text-zinc-500 max-w-xs leading-relaxed">
                  Ứng dụng đã chuyển tiếp nội dung soạn sẵn tới hộp thư của bạn.
                </p>
                
                <div className="w-full glass p-4 rounded-xl border border-zinc-200/50 dark:border-zinc-800/50 space-y-3 text-left">
                  <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Hoặc bạn có thể sao chép nhanh để gửi tay:</p>
                  <div className="flex items-center justify-between bg-zinc-100/50 dark:bg-zinc-900/50 p-2.5 rounded-lg border border-zinc-200/40 dark:border-zinc-800/40">
                    <span className="text-xs font-mono text-zinc-700 dark:text-zinc-350 select-all">tranvuuyenmy0305@gmail.com</span>
                    <button 
                      type="button" 
                      onClick={handleCopyEmail}
                      className="text-[10px] font-bold text-purple-600 dark:text-purple-400 hover:underline cursor-pointer"
                    >
                      {copied ? 'Đã copy!' : 'Sao chép Email'}
                    </button>
                  </div>
                </div>

                <button 
                  type="button" 
                  onClick={() => setSent(false)} 
                  className="text-xs text-zinc-400 hover:text-zinc-200 underline mt-4 cursor-pointer"
                >
                  Quay lại gửi thêm tin nhắn
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1.5">Tên của bạn</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Nguyễn Văn A"
                      className="w-full px-4 py-2.5 rounded-xl text-sm bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500/50 transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1.5">Email</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="email@example.com"
                      className="w-full px-4 py-2.5 rounded-xl text-sm bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500/50 transition-all duration-200"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1.5">Tin nhắn</label>
                  <textarea
                    rows={5}
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Chào Uyên My, tôi muốn trao đổi về..."
                    className="w-full px-4 py-2.5 rounded-xl text-sm bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500/50 transition-all duration-200 resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-purple-500/25 cursor-pointer"
                >
                  <FontAwesomeIcon icon={faPaperPlane} size="sm" />
                  Gửi tin nhắn
                </button>
              </>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}

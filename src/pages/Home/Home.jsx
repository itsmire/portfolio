import React from 'react';
import HeroSection from './sections/HeroSection';
import SkillsSection from './sections/SkillsSection';
import FeaturedProjects from './sections/FeaturedProjects';
import ContactSection from './sections/ContactSection';

/**
 * Home page — Trang chủ portfolio của Trần Vũ Uyên My (Mire).
 * Đã tinh gọn còn 4 phần chính: Hero → Kỹ năng & Học vấn → Dự án nổi bật → Liên hệ
 */
export default function Home() {
  return (
    <div className="w-full space-y-6 md:space-y-12">
      <HeroSection />
      <SkillsSection />
      <FeaturedProjects />
      <ContactSection />
    </div>
  );
}

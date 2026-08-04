import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin, faFigma } from '@fortawesome/free-brands-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { SOCIAL_LINKS } from '../../../constants';

/**
 * Footer component với thông tin của Trần Vũ Uyên My.
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-zinc-200/50 dark:border-zinc-800/50 py-10 mt-auto transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left: Branding */}
          <div className="text-center md:text-left">
            <Link to="/" className="text-base font-bold text-zinc-900 dark:text-zinc-50 font-heading">
              Mire<span className="text-purple-500">.</span>
            </Link>
            <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-1">
              Kỹ sư Kỹ thuật Phần mềm · IUH TP.HCM
            </p>
          </div>

          {/* Center: Copyright */}
          <p className="text-xs text-zinc-400 dark:text-zinc-500 flex items-center gap-1">
            © {currentYear} Trần Vũ Uyên My. Làm với{' '}
            <FontAwesomeIcon icon={faHeart} className="text-red-400 text-[10px]" />
            {' '}bằng React & TailwindCSS.
          </p>

          {/* Right: Social links */}
          <div className="flex items-center space-x-4">
            <a
              href={SOCIAL_LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors duration-300"
              aria-label="GitHub"
            >
              <FontAwesomeIcon icon={faGithub} className="w-4 h-4" />
            </a>
            <a
              href={SOCIAL_LINKS.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-500 hover:text-blue-500 dark:text-zinc-400 dark:hover:text-blue-400 transition-colors duration-300"
              aria-label="LinkedIn"
            >
              <FontAwesomeIcon icon={faLinkedin} className="w-4 h-4" />
            </a>
            <a
              href={SOCIAL_LINKS.figma}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-500 hover:text-pink-500 dark:text-zinc-400 dark:hover:text-pink-400 transition-colors duration-300"
              aria-label="Figma"
            >
              <FontAwesomeIcon icon={faFigma} className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

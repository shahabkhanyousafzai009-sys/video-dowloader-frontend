import { useTheme } from '../hooks/useTheme';

export function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      id="theme-toggle"
      onClick={toggleTheme}
      className="relative w-14 h-7 rounded-full transition-all duration-500 ease-out
                 bg-white/10 dark:bg-white/10 border border-white/20
                 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-primary-400/30"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {/* Track icons */}
      <span className="absolute left-2.5 top-1/2 -translate-y-1/2 transition-opacity duration-300 flex items-center"
            style={{ opacity: isDark ? 0.3 : 1 }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-amber-500">
          <circle cx="12" cy="12" r="5"/>
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
        </svg>
      </span>
      <span className="absolute right-2.5 top-1/2 -translate-y-1/2 transition-opacity duration-300 flex items-center"
            style={{ opacity: isDark ? 1 : 0.3 }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-indigo-400">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
      </span>

      {/* Sliding dot */}
      <span
        className={`absolute top-0.5 w-6 h-6 rounded-full transition-all duration-500 ease-out
                     shadow-md ${isDark
                       ? 'translate-x-7 bg-gradient-to-br from-indigo-500 to-purple-600'
                       : 'translate-x-0.5 bg-gradient-to-br from-amber-300 to-orange-400'
                     }`}
      />
    </button>
  );
}

import type { ThemeMode, UiLabels } from '@/types/resume';

interface ThemeToggleProps {
  theme: ThemeMode;
  labels: UiLabels;
  onToggle: () => void;
}

export function ThemeToggle({ theme, labels, onToggle }: ThemeToggleProps) {
  return (
    <button
      type="button"
      className="mode-toggle"
      onClick={onToggle}
      aria-label={labels.theme}
      title={`${labels.theme}: ${
        theme === 'dark' ? labels.dark : labels.light
      }`}
    >
      <span className="mode-toggle__name">{labels.theme}</span>
      <span className="mode-toggle__value">
        {theme === 'dark' ? labels.dark : labels.light}
      </span>
    </button>
  );
}

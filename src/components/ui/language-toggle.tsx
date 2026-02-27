import type { Locale, UiLabels } from '@/types/resume';

interface LanguageToggleProps {
  locale: Locale;
  labels: UiLabels;
  onChange: (locale: Locale) => void;
}

export function LanguageToggle({
  locale,
  labels,
  onChange,
}: LanguageToggleProps) {
  return (
    <div className="language-toggle" role="group" aria-label={labels.language}>
      <button
        type="button"
        className={locale === 'en' ? 'language-toggle__button is-active' : 'language-toggle__button'}
        onClick={() => onChange('en')}
      >
        EN
      </button>
      <button
        type="button"
        className={locale === 'ru' ? 'language-toggle__button is-active' : 'language-toggle__button'}
        onClick={() => onChange('ru')}
      >
        RU
      </button>
    </div>
  );
}

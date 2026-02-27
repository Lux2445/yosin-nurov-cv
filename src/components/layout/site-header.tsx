import { useLanguage } from '@/app/hooks/use-language';
import { useTheme } from '@/app/hooks/use-theme';
import { LanguageToggle } from '@/components/ui/language-toggle';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import type { NavItem, UiLabels } from '@/types/resume';

interface SiteHeaderProps {
  name: string;
  role: string;
  navigation: NavItem[];
  uiLabels: UiLabels;
}

export function SiteHeader({
  name,
  role,
  navigation,
  uiLabels,
}: SiteHeaderProps) {
  const { locale, setLocale } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <a href="#top" className="brand">
          <span className="brand__name">{name}</span>
          <span className="brand__role">{role}</span>
        </a>

        <nav className="site-nav" aria-label="Main navigation">
          {navigation.map((item) => (
            <a key={item.id} href={`#${item.id}`} className="site-nav__link">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="site-header__controls">
          <LanguageToggle
            locale={locale}
            labels={uiLabels}
            onChange={setLocale}
          />
          <ThemeToggle theme={theme} labels={uiLabels} onToggle={toggleTheme} />
        </div>
      </div>
    </header>
  );
}

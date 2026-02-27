import type { ContactItem, HeroContent } from '@/types/resume';

interface HeroSectionProps {
  hero: HeroContent;
  contacts: ContactItem[];
}

export function HeroSection({ hero, contacts }: HeroSectionProps) {
  const quickContacts = contacts.slice(0, 3);
  const highlight = hero.stats[2] ?? hero.stats[0];

  return (
    <section className="hero" id="top">
      <div className="hero__content" data-animate>
        <p className="hero__eyebrow">{hero.location}</p>
        <h1>{hero.name}</h1>
        <p className="hero__role">{hero.role}</p>
        <p className="hero__summary">{hero.summary}</p>

        <div className="hero__actions">
          {hero.actions.map((action) => {
            const isDownload = Boolean(action.download);

            return (
              <a
                key={action.label}
                href={action.href}
                className={`button button--${action.kind}`}
                download={isDownload ? true : undefined}
              >
                {action.label}
              </a>
            );
          })}
        </div>

        <ul className="hero__stats">
          {hero.stats.map((stat) => (
            <li key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </li>
          ))}
        </ul>

      </div>

      <aside className="hero__panel card" data-animate>
        <p className="hero__panel-value">{highlight.value}</p>
        <p className="hero__panel-label">{highlight.label}</p>

        <ul className="hero__contacts hero__contacts--panel">
          {quickContacts.map((item) => (
            <li key={item.label}>
              <span>{item.label}</span>
              {item.href ? <a href={item.href}>{item.value}</a> : <p>{item.value}</p>}
            </li>
          ))}
        </ul>
      </aside>
    </section>
  );
}

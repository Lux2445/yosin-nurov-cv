import { Section } from '@/components/layout/section';
import type { ExperienceContent } from '@/types/resume';

interface ExperienceSectionProps {
  experience: ExperienceContent;
}

export function ExperienceSection({ experience }: ExperienceSectionProps) {
  return (
    <Section id="experience" title={experience.title}>
      <div className="timeline">
        {experience.items.map((item) => (
          <article key={`${item.role}${item.company}`} className="card timeline__item">
            <div className="timeline__head">
              <h3>{item.role}</h3>
              <span>{item.period}</span>
            </div>
            <p className="timeline__meta">
              {item.company} · {item.location}
            </p>
            <ul className="timeline__list">
              {item.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  );
}


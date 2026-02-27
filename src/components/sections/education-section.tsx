import { Section } from '@/components/layout/section';
import type { EducationContent } from '@/types/resume';

interface EducationSectionProps {
  education: EducationContent;
}

export function EducationSection({ education }: EducationSectionProps) {
  return (
    <Section id="education" title={education.title}>
      <div className="education-grid">
        {education.items.map((item) => (
          <article key={`${item.degree}${item.institution}`} className="card education-card">
            <p className="education-card__period">{item.period}</p>
            <h3>{item.degree}</h3>
            <p className="education-card__institution">{item.institution}</p>
            <ul>
              {item.details.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  );
}

import { Section } from '@/components/layout/section';
import type { CollectionContent } from '@/types/resume';

interface InterestsSectionProps {
  languages: CollectionContent;
  interests: CollectionContent;
}

export function InterestsSection({ languages, interests }: InterestsSectionProps) {
  return (
    <Section id="extras" title={interests.title}>
      <div className="dual-grid">
        <article className="card">
          <h3>{languages.title}</h3>
          <ul className="chip-list">
            {languages.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article className="card">
          <h3>{interests.title}</h3>
          <ul className="stack-list">
            {interests.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </div>
    </Section>
  );
}

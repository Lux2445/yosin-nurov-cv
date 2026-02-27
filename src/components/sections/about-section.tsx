import { Section } from '@/components/layout/section';
import type { AboutContent } from '@/types/resume';

interface AboutSectionProps {
  about: AboutContent;
}

export function AboutSection({ about }: AboutSectionProps) {
  return (
    <Section id="about" title={about.title}>
      <div className="prose">
        {about.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </Section>
  );
}

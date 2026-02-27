import { Section } from '@/components/layout/section';
import type { SkillsContent } from '@/types/resume';

interface SkillsSectionProps {
  skills: SkillsContent;
}

export function SkillsSection({ skills }: SkillsSectionProps) {
  return (
    <Section id="skills" title={skills.title}>
      <div className="skills-grid">
        {skills.groups.map((group) => (
          <article key={group.title} className="card skill-card">
            <h3>{group.title}</h3>
            <ul>
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  );
}

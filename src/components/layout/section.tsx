import type { PropsWithChildren } from 'react';

interface SectionProps extends PropsWithChildren {
  id: string;
  title: string;
  className?: string;
}

export function Section({ id, title, className, children }: SectionProps) {
  const sectionClass = className ? `section ${className}` : 'section';

  return (
    <section id={id} className={sectionClass} data-animate>
      <header className="section__head">
        <h2>{title}</h2>
      </header>
      <div className="section__body">{children}</div>
    </section>
  );
}

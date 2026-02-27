import { Section } from '@/components/layout/section';
import type { ContactContent } from '@/types/resume';

interface ContactSectionProps {
  contact: ContactContent;
}

export function ContactSection({ contact }: ContactSectionProps) {
  return (
    <Section id="contacts" title={contact.title}>
      <div className="contact-block">
        <p className="contact-block__text">{contact.description}</p>
        <ul className="contact-list">
          {contact.items.map((item) => (
            <li key={item.label} className="card contact-list__item">
              <span>{item.label}</span>
              {item.href ? <a href={item.href}>{item.value}</a> : <p>{item.value}</p>}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

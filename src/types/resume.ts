export type Locale = 'ru' | 'en';
export type ThemeMode = 'light' | 'dark';

export type SectionId =
  | 'about'
  | 'skills'
  | 'experience'
  | 'education'
  | 'contacts';

export interface NavItem {
  id: SectionId;
  label: string;
}

export interface HeroAction {
  label: string;
  href: string;
  kind: 'primary' | 'secondary';
  download?: boolean;
}

export interface HeroStat {
  value: string;
  label: string;
}

export interface HeroContent {
  name: string;
  role: string;
  location: string;
  summary: string;
  actions: HeroAction[];
  stats: HeroStat[];
}

export interface AboutContent {
  title: string;
  paragraphs: string[];
}

export interface SkillGroup {
  title: string;
  items: string[];
}

export interface SkillsContent {
  title: string;
  groups: SkillGroup[];
}

export interface ExperienceItem {
  role: string;
  company: string;
  location: string;
  period: string;
  bullets: string[];
}

export interface ExperienceContent {
  title: string;
  items: ExperienceItem[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  details: string[];
}

export interface EducationContent {
  title: string;
  items: EducationItem[];
}

export interface CollectionContent {
  title: string;
  items: string[];
}

export interface ContactItem {
  label: string;
  value: string;
  href?: string;
}

export interface ContactContent {
  title: string;
  description: string;
  items: ContactItem[];
}

export interface UiLabels {
  language: string;
  theme: string;
  light: string;
  dark: string;
}

export interface ResumeContent {
  navigation: NavItem[];
  ui: UiLabels;
  hero: HeroContent;
  about: AboutContent;
  skills: SkillsContent;
  experience: ExperienceContent;
  education: EducationContent;
  languages: CollectionContent;
  interests: CollectionContent;
  contact: ContactContent;
}

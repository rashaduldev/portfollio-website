// types.ts

export type PortfolioJSON = {
  header: HeaderSection;
  cookieConsent: CookieConsentSection;
  main: MainSection;
  skills: SkillsSection;
  experience: Record<string, ExperienceItem>;
  education: Record<string, EducationItem>;
  Educationheading:string;
  footer: FooterSection;
  projectsSection: ProjectsSection;
  testimonialsSection: TestimonialSection;
  statsSection: StatsSectionType;
  whyChooseMeSection: WhyChooseMeSectionType;
  latestArticlesSection: LatestArticlesSectionType;
  experienceHeading:string;
};

interface HeaderSection {
  brand: string;
  home: string;
  projects: string;
  contact: string;
  scrollMessage: string;
}

interface CookieConsentSection {
  title: string;
  message: string;
  accept: string;
  reject: string;
}

interface MainSection {
  subtitle: string;
  title: string;
  description: string;
  leftbutton: string;
  resume: string;
}

// @/types/translations.ts

export interface SkillsSection {
  photoshop: string;
  figma: string;
  xd: string;
  illustrator: string;
  git: string;
  firebase: string;
  cloudinary: string;
  cpanel: string;
  vs: string;
  jetBrains: string;
  html: string;
  css: string;
  js: string;
  ts: string;
  react: string;
  next: string;
  vue: string;
  tailwind: string;
  bootstrap: string;
  node: string;
  ex: string;
  wp: string;
  tools: string;
  designTitle: string;
  devTitle: string;
  about: string;
  [key: string]: string;
}

export interface Translations {
  skills: SkillsSection;
}


interface ExperienceItem {
  title: string;
  company: string;
  department: string;
  description: string;
}

interface EducationItem {
  title: string;
  company: string;
  department: string;
  description: string;
}

interface FooterSection {
  company: string;
  about: string;
  contact: string;
  privacy: string;
  terms: string;
  resources: string;
  articles: string;
  help: string;
  faq: string;
  follow: string;
  newsletter: string;
  newsletterDesc: string;
  emailPlaceholder: string;
  subscribe: string;
  subscribeSuccess: string;
  copyright: string;
}

export interface Project {
  title: string;
  description: string;
  desktopimage: string;
  mobileimage: string;
  techStack: string;
  link: string;
  endtrac: string;
}

interface ProjectsSection {
  projectsHeading: string;
  trustedProjects: string;
  viewallproject: string,
  projects: Project[];
}

interface TestimonialItem {
  quote: string;
  highlight: string;
  image: string;
  name: string;
  username: string;
}

interface TestimonialSection {
  testimonialHeading: string;
  trustedClients: string;
  testimonials: TestimonialItem[];
}

export interface StatsSectionType {
  title: string;
  stats: StatItem[];
}

export interface StatItem {
  value: number;
  label: string;
}

export interface WhyChooseMeSectionType {
  title: string;
  description: string;
  contactbutton: string;
  contactdescription: string;
  features: FeatureItem[];
}

export interface FeatureItem {
  title: string;
  description: string;
}

export interface LatestArticlesSectionType {
  lefttitle: string;
  title: string;
  viewAllLabel: string;
  readMoreLabel: string;
  articles: ArticleItem[];
}

export interface ArticleItem {
  title: string;
  category: string;
  date: string;
  imageUrl: string;
  link: string;
}

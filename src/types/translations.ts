export type PortfolioJSON = {
  header: {
    brand: string
    home: string
    projects: string
    contact: string
  },
  cookieConsent: {
    title: string
    message: string
    accept: string
    reject: string
  },
  main: {
    subtitle: string
    title: string
    description: string
    leftbutton: string
    resume: string
  },
  skills: {
    designTitle: string
    devTitle: string
    tools: string
    git: string
    firebase: string
    cloudinary: string
    jetBrains: string
    cpanel: string
    vs: string
    photoshop: string
    figma: string
    xd: string
    illustrator: string
    html: string
    css: string
    js: string
    ts: string
    react: string
    next: string
    vue: string
    tailwind: string
    bootstrap: string
    node: string
    ex: string
    wp: string
  },
  experience: {
    [year: string]: {
      title: string
      company: string
      department: string
      description: string
    }
  },
  footer: {
    company: string
    about: string
    contact: string
    privacy: string
    terms: string
    resources: string
    blog: string
    help: string
    faq: string
    follow: string
    newsletter: string
    newsletterDesc: string
    emailPlaceholder: string
    subscribe: string
    subscribeSuccess: string
    copyright: string
  }
}

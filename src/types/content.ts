export type Service = {
  id: string;
  title: string;
  description: string;
  icon: string; // emoji or icon name
};

export type Testimonial = {
  name: string;
  role: string;
  quote: string;
};

export type SiteContent = {
  hero: {
    headline: string;
    subheadline: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  services: Service[];
  testimonials: Testimonial[];
  contact: {
    email: string;
    phone: string;
    address: string;
  };
  footerNote: string;
};

type Profile = {
  name: string;
  title: string;
  introduction: string;
  biography: string;
  email?: string;
  availability?: string;
  portrait?: { src: string; alt: string };
  award?: { title: string; credit: string; photo?: { src: string; alt: string } };
  resume?: string;
  smoothScroll: boolean;
};

export const profile: Profile = {
  name: 'Jia',
  title: 'Independent frontend designer',
  introduction: 'I’m Jia. I design and build websites with a focus on layout, color, and interaction.',
  biography: 'I enjoy working with type, color, and motion. I test my designs in the browser to see how they feel on different screens and with a keyboard.',
  email: 'hsuthirinaing.it@gmail.com',
  portrait: {
    src: '/images/jia-portrait-archway.webp',
    alt: 'Jia wearing glasses and a light beige top, seated in a white stone archway',
  },
  award: {
    title: 'First prize at Project Show 2026',
    credit: 'I was the main frontend designer on the winning team at Technological University (Mandalay).',
    photo: {
      src: '/images/project-show-first-prize.webp',
      alt: 'First Prize sign for Project Show 2026 at Technological University (Mandalay)',
    },
  },
  smoothScroll: false,
};

export const process = [
  {
    name: 'Discover',
    description: 'I ask who the site is for, what they need, and what references fit.',
  },
  {
    name: 'Design',
    description: 'I try a few layouts and prototype the interactions that matter.',
  },
  {
    name: 'Develop',
    description: 'I build the screens and check how they adapt to different devices.',
  },
  {
    name: 'Refine',
    description: 'I fix cramped text, unclear buttons, and awkward keyboard interactions.',
  },
];

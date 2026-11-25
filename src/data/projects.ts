export type Project = {
  slug: string;
  name: string;
  category: string;
  year: string;
  concept: boolean;
  overview: string;
  role: string;
  technologies: string[];
  artwork: { image: { src: string; alt: string } };
  caseStudy: {
    layout: 'wide' | 'split';
    design: string;
    palette: { name: string; hex: string }[];
    build: string;
  };
  liveDemo?: string;
  sourceCode?: string;
};

export const projects: Project[] = [
  {
    slug: 'tomo-nomo',
    name: 'Tomo + Nomo',
    category: 'Interactive web game',
    year: '2026',
    concept: false,
    overview: 'An arcade for two. I designed the game picker, setup form, and story reveal. Tomo is playable now, and Nomo has a coming-soon page.',
    role: 'Frontend designer',
    technologies: ['React', 'Vite', 'Tailwind CSS', 'Custom CSS'],
    artwork: { image: { src: '/images/tomo-nomo.webp', alt: 'Tomo + Nomo arcade home screen with an orange mascot, two game cards, and a Let’s play button' } },
    caseStudy: {
      layout: 'wide',
      design: 'I used warm orange for Tomo and teal for Nomo so each game is easy to spot. Rounded headings give the arcade a playful feel, and the setup labels pair English with Burmese.',
      palette: [{ name: 'Obsidian', hex: '#110f15' }, { name: 'Ember', hex: '#e3581d' }, { name: 'Warm cream', hex: '#f5ccbb' }],
      build: 'I split the React UI into the arcade, setup, and results. Players can jump straight to the form on mobile, and selected states show which game or story tone they picked.',
    },
    liveDemo: 'https://tomo-nomo.vercel.app/',
    sourceCode: 'https://github.com/AungPhyoeNaing/tomo-nomo',
  },
  {
    slug: 'trends-of-tum',
    name: 'Trends of TUM',
    category: 'Campus social app',
    year: '2026',
    concept: false,
    overview: 'A campus social app for posts, profiles, and chat. I designed the feed and topic filters to help students find the conversations they care about.',
    role: 'Frontend designer',
    technologies: ['React', 'Vite', 'Tailwind CSS', 'Socket.IO Client'],
    artwork: { image: { src: '/images/trends-of-tum.webp', alt: 'Trends of TUM desktop feed with a glass welcome banner, an open post category picker, and the Trendmates sidebar' } },
    caseStudy: {
      layout: 'wide',
      design: 'Blue glass panels give navigation and posts their own space. I used a rounded wordmark and simpler type for the feed, where people read longer posts.',
      palette: [{ name: 'Sky blue', hex: '#8ec5ff' }, { name: 'Deep blue', hex: '#193cb8' }, { name: 'Yellow', hex: '#f5eb27' }],
      build: 'On phones, posts stack in one column and navigation moves to the bottom. Socket.IO Client shows new comments, reactions, and messages as they come in.',
    },
    sourceCode: 'https://github.com/AungPhyoeNaing/tot-project-show',
  },
];

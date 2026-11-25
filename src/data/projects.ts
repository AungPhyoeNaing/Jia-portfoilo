export type Project = {
  slug: string;
  name: string;
  category: string;
  year: string;
  concept: boolean;
  tagline: string;
  overview: string;
  role: string;
  technologies: string[];
  artwork: { image: { src: string; alt: string } };
  caseStudy: {
    layout: 'wide' | 'split';
    objectives: string;
    problem: string;
    exploration: string;
    identity: string;
    palette: { name: string; hex: string }[];
    typography: string;
    interface: string;
    responsive: string;
    implementation: string;
    lessons: string;
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
    tagline: 'A little arcade for two.',
    overview: 'Tomo + Nomo is an arcade-style site for two people. I focused on the frontend, from the character cards on the home screen to the setup form and the story reveal. Tomo is playable now, and Nomo has a coming-soon page.',
    role: 'Frontend designer',
    technologies: ['React', 'Vite', 'Tailwind CSS', 'Custom CSS'],
    artwork: { image: { src: '/images/tomo-nomo.webp', alt: 'Tomo + Nomo arcade home screen with an orange mascot, two game cards, and a Let’s play button' } },
    caseStudy: {
      layout: 'wide',
      objectives: 'I wanted the site to feel like an arcade while making it clear where to start and what two players would need.',
      problem: 'The home screen introduces two characters, but only Tomo is playable right now. People need to see that before they choose a game.',
      exploration: 'I put both games in one picker and used a coming-soon label on Nomo. The main button for Tomo takes you straight to the setup form.',
      identity: 'Tomo uses orange highlights and warm cream text on a dark background. Nomo’s teal card helps you tell the two games apart at a glance.',
      palette: [{ name: 'Obsidian', hex: '#110f15' }, { name: 'Ember', hex: '#e3581d' }, { name: 'Warm cream', hex: '#f5ccbb' }],
      typography: 'Rounded headings help the site feel playful. The setup form keeps labels short and pairs English with Burmese for the name and birthday fields.',
      interface: 'The home screen introduces both characters. In Tomo, players enter two names and birthdays, choose Friends or Couple, and pick the tone of their story.',
      responsive: 'The arcade and setup are separate sections. On a phone, players can jump straight to the form and work through the two sets of fields in order.',
      implementation: 'The frontend uses React components for the arcade, the form, and the results. I gave the game and story choices clear selected states and kept loading and fallback states in the same flow.',
      lessons: 'The characters give the page its personality. The game labels, selected states, and main button help people keep their place.',
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
    tagline: 'A feed for campus life.',
    overview: 'Trends of TUM is a social app for campus posts and conversations. My focus was the frontend, including how people browse the feed, switch topics, and move between posts, profiles, and chat.',
    role: 'Frontend designer',
    technologies: ['React', 'Vite', 'Tailwind CSS', 'Socket.IO Client'],
    artwork: { image: { src: '/images/trends-of-tum.webp', alt: 'Trends of TUM desktop feed with a glass welcome banner, an open post category picker, and the Trendmates sidebar' } },
    caseStudy: {
      layout: 'wide',
      objectives: 'I wanted students to be able to scan the latest posts, find a topic, and join a conversation without losing their place in the feed.',
      problem: 'The feed mixes announcements, study posts, and memes. It also has to make room for reactions, comments, and messages.',
      exploration: 'I kept the feed in the middle, with the main navigation to the left on desktop. Categories let people narrow the feed to the topics they want to see.',
      identity: 'I used blue-tinted glass panels, a bright yellow logo accent, and pale outlines so the navigation and feed are easy to tell apart.',
      palette: [{ name: 'Sky blue', hex: '#8ec5ff' }, { name: 'Deep blue', hex: '#193cb8' }, { name: 'Yellow', hex: '#f5eb27' }],
      typography: 'The rounded wordmark gives the app some personality. The feed uses a quieter type style to make longer posts easier to read.',
      interface: 'The screenshot shows the feed with sample posts. Topic filters, post actions, and profile links are part of the same layout.',
      responsive: 'Desktop has room for the side panels and a two-column feed. On phones, posts stack in one column and the main navigation moves to the bottom.',
      implementation: 'The frontend uses React and Tailwind CSS for the feed and its controls. The app uses Socket.IO Client to show new comments, reactions, and chat messages as they come in.',
      lessons: 'The feed is easier to scan when each post puts the author, content, and actions in the same order.',
    },
    sourceCode: 'https://github.com/AungPhyoeNaing/tot-project-show',
  },
];

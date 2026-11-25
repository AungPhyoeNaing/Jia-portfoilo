type Profile = {
  name: string;
  title: string;
  introduction: string;
  biography: string[];
  philosophy: string;
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
  introduction: 'Hi, I’m Jia. I design and build websites, and I like figuring out how small details can make them feel more personal.',
  biography: [
    'I enjoy working with type, color, and motion. Sometimes it’s as simple as finding a better line break or giving a button a little more room.',
    'I like building what I design because things can feel different once you can scroll, resize the screen, or use a keyboard. That’s usually when I find the next thing to fix.',
  ],
  philosophy: 'Technology should feel human. Design should feel alive.',
  portrait: {
    src: '/images/jia-portrait.webp',
    alt: 'Jia in a blue dress, resting her chin on her hand in front of red flowers and green leaves',
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
    description: 'I start by asking who the site is for and what they need from it. Then I collect references and pick a direction to try.',
    artifact: 'Notes and references',
  },
  {
    name: 'Design',
    description: 'I try out layouts, fonts, and colors on a few key screens. If an interaction matters, I make a quick prototype to see how it feels.',
    artifact: 'Screen drafts and a quick prototype',
  },
  {
    name: 'Develop',
    description: 'I build the screens and check how they work in the browser, including on a phone and with a keyboard.',
    artifact: 'Working pages and shared components',
  },
  {
    name: 'Refine',
    description: 'I go through the site again to catch things like cramped text, unclear buttons, or an animation that takes too long.',
    artifact: 'Final device and accessibility checks',
  },
];

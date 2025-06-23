import type { ProfileCardProperties } from '~/components/profile-card/profile-card';

import avatarAlena from '~/assets/img/alena.webp';
import avatarKsyusha from '~/assets/img/ksyusha.webp';
import avatarMargo from '~/assets/img/margo.webp';
import avatarMikhail from '~/assets/img/mikhail.webp';
import avatarYulik from '~/assets/img/yulikk.webp';

interface TeamData {
  EXTERNAL_SUPPORT: ProfileCardProperties[];
  MEMBERS: ProfileCardProperties[];
}

export const TEAM_DATA: TeamData = {
  EXTERNAL_SUPPORT: [
    {
      avatarUrl: avatarMargo,
      bio: 'Hi! I’m Meg. What began as a personal curiosity has grown into a deep passion - not just for front-end development, but for the people who make the journey meaningful. Becoming a developer, and being part of this course, first as a student, now as a mentor and curator, has shown me how powerful a supportive community can be. Watching others grow, overcome challenges, and discover their own love for coding is just as fulfilling as building something myself. I’m excited to keep learning, creating, and helping others do the same.',
      contributions: [
        'Code reviews',
        'Invaluable advices',
        'Sanity checks',
        'Warmth and support on tough days',
      ],
      fullname: 'Meg Golubeva',
      github: { login: 'stardustmeg', url: 'https://github.com/stardustmeg' },
      roles: ['😎 Mentor', '🍯 Honey supplier', '🤝 Helping hand', '🦉 Wise Owl'],
    },
    {
      avatarUrl: avatarYulik,
      bio: 'Hi! My name is Yulia. A couple of years ago, I moved from Belarus to Krakow. Before that, I worked as a 1C programmer, helping accountants and financiers solve puzzles. Over time, I got tired of creating repetitive reports and decided to dive into the world of frontend development. I absolutely love this course and am grateful to the people behind it.',
      contributions: [
        'Endless calls on commercetools',
        'A calm voice in the chaos',
        'Consistently kind',
      ],
      fullname: '	Yuliya Kursevich',
      github: { login: 'yulikK', url: 'https://github.com/yulikK' },
      roles: ['👸 CT-SDK queen', '🤝 Helping hand', '🦉 Wise Owl'],
    },
  ],
  MEMBERS: [
    {
      avatarUrl: avatarMikhail,
      bio: "Hello! I'm Grim. Currently learning web development, focusing on HTML, CSS, JS, TS. I've always been interested in technology, and now I'm building projects to improve my coding skills. I'm especially excited about creating interactive and responsive websites. My goal is to become a front-end developer and work on real-world applications.",
      contributions: [
        'Main page',
        'Login page',
        'Catalog page',
        'Product details page',
        'About us page',
      ],
      fullname: 'Mikhail Zubenko',
      github: { login: 'ripetchor', url: 'https://github.com/ripetchor' },
      roles: ['🎨 Architecture & UI', '🔮 CT-SDK', '🛠️ API'],
    },
    {
      avatarUrl: avatarKsyusha,
      bio: 'Hi, I’m Shusha! I’m a former architect who first tried programming for work — and quickly got hooked. Then, almost by accident, I stumbled upon this course, and that’s how I found myself diving into frontend. Thanks to the amazing community here, the journey from the very first line of JS code to the final project felt not only easier, but genuinely fun. I feel incredibly lucky this past year — to have found this course, met incredible fellow students, and learned from the best mentor. Growing in this field has been so fast that things I thought were impossible yesterday are just part of the process today.',
      contributions: [
        'Main page',
        'Registration page',
        'User profile page',
        'Product details page',
        'Cart page',
        'CI/CD',
      ],
      fullname: 'Ksenia Gorina',
      github: { login: 'asfound', url: 'https://github.com/asfound' },
      roles: ['👑 Team lead', '🎨 UI & Content', '🔮 CT-SDK', '🛠️ API'],
    },
    {
      avatarUrl: avatarAlena,
      bio: "I'm a passionate front-end developer who has been deeply focused on learning for over a year. Every single day I push myself forward — exploring new tools, solving challenges, and turning ideas into projects. Today, I'm confident working with vanilla JavaScript, have solid TypeScript skills, and I'm currently diving into Angular. Over the past year, I've built numerous practical projects and tackled lots of coding tasks — and every one of them helped me grow.",
      contributions: ['CI/CD'],
      fullname: 'Alena Radomskaia',
      github: { login: 'radomskaia', url: 'https://github.com/radomskaia' },
      roles: ['📊 CI/CD', '😞 Ex-member'],
    },
  ],
} as const;

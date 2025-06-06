import type { ProfileCardProperties } from '~/components/profile-card/profile-card';

import avatarAlena from '~/assets/img/alena.jpg';
import avatarKsyusha from '~/assets/img/ksyusha.png';
import avatarMargo from '~/assets/img/margo.jpg';
import avatarMikhail from '~/assets/img/mikhail.png';
import avatarYulik from '~/assets/img/yulikk.png';

interface TeamData {
  EXTERNAL_SUPPORT: ProfileCardProperties[];
  MEMBERS: ProfileCardProperties[];
}

export const TEAM_DATA: TeamData = {
  EXTERNAL_SUPPORT: [
    {
      avatarUrl: avatarMargo,
      bio: 'Hi! I’m Meg. What began as a personal curiosity has grown into a deep passion - not just for front-end development, but for the people who make the journey meaningful. Becoming a developer, and being part of this course, first as a student, now as a mentor and curator, has shown me how powerful a supportive community can be. Watching others grow, overcome challenges, and discover their own love for coding is just as fulfilling as building something myself. I’m excited to keep learning, creating, and helping others do the same.',
      contributions: undefined,
      fullname: 'Meg Golubeva',
      github: { login: 'stardustmeg', url: 'https://github.com/stardustmeg' },
      roles: ['Mentor', 'Helping hand'],
    },
    {
      avatarUrl: avatarYulik,
      bio: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit veritatis temporibus asperiores, perspiciatis blanditiis ab similique non eum error minus praesentium veniam deserunt corrupti repellendus officiis quas tempora molestiae sit. Fugiat quae tempore atque asperiores magni id illo mollitia iste ipsam eaque deserunt in adipisci assumenda, facere neque repellendus error cumque! Officiis ducimus suscipit voluptatibus, nam quia cum harum soluta quis reiciendis illo aliquid id quasi, aliquam ipsam adipisci consectetur eum cumque doloribus perspiciatis excepturi fugiat assumenda cupiditate repellendus maxime.',
      contributions: undefined,
      fullname: '	Yuliya Kursevich',
      github: { login: 'yulikK', url: 'https://github.com/yulikK' },
      roles: ['SDK queen', 'Helping hand'],
    },
  ],
  MEMBERS: [
    {
      avatarUrl: avatarKsyusha,
      bio: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit veritatis temporibus asperiores, perspiciatis blanditiis ab similique non eum error minus praesentium veniam deserunt corrupti repellendus officiis quas tempora molestiae sit. Fugiat quae tempore atque asperiores magni id illo mollitia iste ipsam eaque deserunt in adipisci assumenda, facere neque repellendus error cumque! Officiis ducimus suscipit voluptatibus, nam quia cum harum soluta quis reiciendis illo aliquid id quasi, aliquam ipsam adipisci consectetur eum cumque doloribus perspiciatis excepturi fugiat assumenda cupiditate repellendus maxime.',
      contributions: [
        'Main Page',
        'Registration page',
        'User profile page',
        'Catalog page',
        'Product details page',
        'Cart page',
      ],
      fullname: 'Ksenia Gorina',
      github: { login: 'asfound', url: 'https://github.com/asfound' },
      roles: ['Team lead', 'UI', 'CT-SDK', 'API'],
    },
    {
      avatarUrl: avatarMikhail,
      bio: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit veritatis temporibus asperiores, perspiciatis blanditiis ab similique non eum error minus praesentium veniam deserunt corrupti repellendus officiis quas tempora molestiae sit. Fugiat quae tempore atque asperiores magni id illo mollitia iste ipsam eaque deserunt in adipisci assumenda, facere neque repellendus error cumque! Officiis ducimus suscipit voluptatibus, nam quia cum harum soluta quis reiciendis illo aliquid id quasi, aliquam ipsam adipisci consectetur eum cumque doloribus perspiciatis excepturi fugiat assumenda cupiditate repellendus maxime.',
      contributions: ['Login page', 'Catalog page', 'Product details page', 'About us page'],
      fullname: 'Mikhail Zubenko',
      github: { login: 'ripetchor', url: 'https://github.com/ripetchor' },
      roles: ['UI', 'CT-SDK', 'API'],
    },
    {
      avatarUrl: avatarAlena,
      bio: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit veritatis temporibus asperiores, perspiciatis blanditiis ab similique non eum error minus praesentium veniam deserunt corrupti repellendus officiis quas tempora molestiae sit. Fugiat quae tempore atque asperiores magni id illo mollitia iste ipsam eaque deserunt in adipisci assumenda, facere neque repellendus error cumque! Officiis ducimus suscipit voluptatibus, nam quia cum harum soluta quis reiciendis illo aliquid id quasi, aliquam ipsam adipisci consectetur eum cumque doloribus perspiciatis excepturi fugiat assumenda cupiditate repellendus maxime.',
      contributions: ['CI/CD'],
      fullname: 'Alena Radomskaia',
      github: { login: 'radomskaia', url: 'https://github.com/radomskaia' },
      roles: ['CI/CD', 'Ex-member'],
    },
  ],
} as const;

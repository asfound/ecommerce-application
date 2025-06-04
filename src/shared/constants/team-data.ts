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
      bio: '',
      contributions: undefined,
      fullname: 'Meg Golubeva',
      github: { login: 'stardustmeg', url: 'https://github.com/stardustmeg' },
      roles: ['Mentor', 'Helping hand'],
    },
    {
      avatarUrl: avatarYulik,
      bio: '',
      contributions: undefined,
      fullname: '	Yuliya Kursevich',
      github: { login: 'yulikK', url: 'https://github.com/yulikK' },
      roles: ['SDK queen', 'Helping hand'],
    },
  ],
  MEMBERS: [
    {
      avatarUrl: avatarKsyusha,
      bio: '',
      contributions: [],
      fullname: 'Ksenia Gorina',
      github: { login: 'asfound', url: 'https://github.com/asfound' },
      roles: ['Team lead', 'UI', 'API'],
    },
    {
      avatarUrl: avatarMikhail,
      bio: '',
      contributions: [],
      fullname: 'Mikhail Zubenko',
      github: { login: 'ripetchor', url: 'https://github.com/ripetchor' },
      roles: ['UI', 'API'],
    },
    {
      avatarUrl: avatarAlena,
      bio: '',
      contributions: [],
      fullname: 'Alena Radomskaia',
      github: { login: 'radomskaia', url: 'https://github.com/radomskaia' },
      roles: ['CI/CD', 'Ex-member'],
    },
  ],
} as const;

import type { ProfileCardProperties } from '~/components/profile-card/profile-card';

interface TeamData {
  EXTERNAL_SUPPORT: ProfileCardProperties[];
  MEMBERS: ProfileCardProperties[];
}

export const TEAM_DATA: TeamData = {
  EXTERNAL_SUPPORT: [
    {
      avatarUrl: '',
      bio: '',
      contributions: undefined,
      fullname: 'Meg Golubeva',
      github: { login: 'stardustmeg', url: 'https://github.com/stardustmeg' },
      roles: [],
    },
    {
      avatarUrl: '',
      bio: '',
      contributions: undefined,
      fullname: '	Yuliya Kursevich',
      github: { login: 'yulikK', url: 'https://github.com/yulikK' },
      roles: [],
    },
  ],
  MEMBERS: [
    {
      avatarUrl: '',
      bio: '',
      contributions: [],
      fullname: 'Ksenia Gorina',
      github: { login: 'asfound', url: 'https://github.com/asfound' },
      roles: [],
    },
    {
      avatarUrl: '',
      bio: '',
      contributions: [],
      fullname: 'Mikhail Zubenko',
      github: { login: 'ripetchor', url: 'https://github.com/ripetchor' },
      roles: [],
    },
    {
      avatarUrl: '',
      bio: '',
      contributions: [],
      fullname: 'Alena Radomskaia',
      github: { login: 'radomskaia', url: 'https://github.com/radomskaia' },
      roles: [],
    },
  ],
} as const;

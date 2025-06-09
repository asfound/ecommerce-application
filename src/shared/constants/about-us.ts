export const ABOUT_US_TEXT = {
  TITLE_COLLABORATION: 'Collaboration',
  TITLE_RS: 'RS School',
  TITLE_TEAM: 'HUH Team',
  TITLE_THANKS: 'Special thanks',
} as const;

export const RS_SCHOOL_LINK = 'https://rs.school/';

export const COLLABORATION = [
  {
    paragraph:
      'Our team maintained strong and consistent communication throughout the project by utilizing a dedicated Discord 💬 server. We stayed in touch daily, shared updates through structured daily reports, and held quick voice calls whenever we encountered roadblocks. According to our Statbot metrics, each team member spent at least 10 hours in voice channels — a testament to our willingness to collaborate closely, engage in pair programming, and make fast, informed decisions together.',
  },
  {
    paragraph:
      'A shared design prototype in Figma 🎨 laid the foundation for smooth development. By agreeing on a unified layout and consistent styling from the start, we were able to work in parallel on different parts of the application with minimal friction.',
  },
  {
    paragraph:
      'Our CI/CD ⚙️ pipeline also played a crucial role in streamlining our workflow. Every pull request is automatically formatted, and contributors only need to provide a changelog summary. Previews are built instantly, related issues are moved to the "In Review" column automatically, and the issue closes when the branch is squashed and merged. Real-time notifications in our Telegram 📲 channels ensure that every team member is promptly informed about updates in production, development environments, and pull requests.',
  },
  {
    paragraph:
      'These tools, combined with our mutual support and shared commitment to quality, enabled us to collaborate effectively and deliver the project on time.',
  },
];

import { ProfileNavigationView } from './profile-navigation.view';

const profileNavigationView = new ProfileNavigationView([
  {
    name: 'Information',
    onClick: vi.fn(),
  },
  {
    name: 'Password',
    onClick: vi.fn(),
  },
  {
    name: 'Addresses',
    onClick: vi.fn(),
  },
]);

test('profileNavigationView should be defined', () => {
  expect(profileNavigationView).toBeDefined();
});

test('profileNavigationView should be instance of ProfileNavigationView', () => {
  expect(profileNavigationView).toBeInstanceOf(ProfileNavigationView);
});

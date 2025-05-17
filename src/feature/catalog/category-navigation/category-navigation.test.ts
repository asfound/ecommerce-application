import { CategoryNavigationView } from './category-navigation.view';

const categoryNavigationView = new CategoryNavigationView();

test('categoryNavigationView should be defined', () => {
  expect(categoryNavigationView).toBeDefined();
});

test('categoryNavigationView should be instance of CategoryNavigationView', () => {
  expect(categoryNavigationView).toBeInstanceOf(CategoryNavigationView);
});

import { FiltersView } from './filters.view';

const filtersView = new FiltersView();

test('filtersView should be defined', () => {
  expect(filtersView).toBeDefined();
});

test('filtersView should be instance of FiltersView', () => {
  expect(filtersView).toBeInstanceOf(FiltersView);
});

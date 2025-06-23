import { SearchAndSortView } from './search-and-sort.view';

const searchAndSortView = new SearchAndSortView();

test('searchAndSortView should be defined', () => {
  expect(searchAndSortView).toBeDefined();
});

test('searchAndSortView should be instance of SearchAndSortView', () => {
  expect(searchAndSortView).toBeInstanceOf(SearchAndSortView);
});

import { Breadcrumbs } from '~/components/breadcrumbs/breadcrumbs';

const breadcrumbs = new Breadcrumbs([]);

test('breadcrumbs should be defined', () => {
  expect(breadcrumbs).toBeDefined();
});

test('breadcrumbs should be instance of Breadcrumbs', () => {
  expect(breadcrumbs).toBeInstanceOf(Breadcrumbs);
});

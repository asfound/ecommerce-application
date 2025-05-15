import { NotFoundWidget } from './not-found-widget';

const notFoundWidget = new NotFoundWidget();

test('notFoundWidget should be defined', () => {
  expect(notFoundWidget).toBeDefined();
});

test('notFoundWidget should be instance of NotFoundWidget', () => {
  expect(notFoundWidget).toBeInstanceOf(NotFoundWidget);
});

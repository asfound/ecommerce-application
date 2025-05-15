import { BaseComponent } from './base-component';

const baseComponent = new BaseComponent({ tagName: 'div' });

test('baseComponent should be defined', () => {
  expect(baseComponent).toBeDefined();
});

test('baseComponent should be instance of BaseComponent', () => {
  expect(baseComponent).toBeInstanceOf(BaseComponent);
});

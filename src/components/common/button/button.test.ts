import { Button } from './button';

const button = new Button({ textContent: '', type: 'button' });

test('button should be defined', () => {
  expect(button).toBeDefined();
});

test('button should be instance of Button', () => {
  expect(button).toBeInstanceOf(Button);
});

import { FormHeader } from './form-header';

const formHeader = new FormHeader({ subtitle: '', title: '' });

test('formHeader should be defined', () => {
  expect(formHeader).toBeDefined();
});

test('formHeader should be instance of FormHeader', () => {
  expect(formHeader).toBeInstanceOf(FormHeader);
});

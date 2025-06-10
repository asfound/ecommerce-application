import { NewAddressForm } from './new-address-form';

const newAddressForm = new NewAddressForm({ onCancel: vi.fn(), onSubmit: vi.fn() });

test('newAddressForm should be defined', () => {
  expect(newAddressForm).toBeDefined();
});

test('newAddressForm should be instance of NewAddressForm', () => {
  expect(newAddressForm).toBeInstanceOf(NewAddressForm);
});

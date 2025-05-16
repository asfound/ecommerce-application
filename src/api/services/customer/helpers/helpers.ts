import type { Customer, MyCustomerUpdateAction } from '@commercetools/platform-sdk';

import {
  createChangeEmailAction,
  createSetDateOfBirthAction,
  createSetFirstNameAction,
  createSetLastNameAction,
} from '../actions/actions.ts';

export const shouldUpdateField = <TField extends keyof Omit<Customer, 'addresses'>>(
  sourceField: Customer[TField],
  editedField: Customer[TField],
): boolean => {
  return sourceField != null && editedField != null && sourceField !== editedField;
};

export const getPersonalDataUpdateActions = (
  sourceCustomer: Customer,
  editedCustomer: Customer,
): MyCustomerUpdateAction[] => {
  const actions: MyCustomerUpdateAction[] = [];

  const {
    dateOfBirth: sourceDateOfBirth,
    email: sourceEmail,
    firstName: sourceFirstName,
    lastName: sourceLastName,
  } = sourceCustomer;

  const {
    dateOfBirth: editedDateOfBirth,
    email: editedEmail,
    firstName: editedFirstName,
    lastName: editedLastName,
  } = editedCustomer;

  if (shouldUpdateField(sourceFirstName, editedFirstName) && editedFirstName != null) {
    actions.push(createSetFirstNameAction(editedFirstName));
  }

  if (shouldUpdateField(sourceLastName, editedLastName) && editedLastName != null) {
    actions.push(createSetLastNameAction(editedLastName));
  }

  if (shouldUpdateField(sourceEmail, editedEmail) && editedEmail.length > 0) {
    actions.push(createChangeEmailAction(editedEmail));
  }

  if (shouldUpdateField(sourceDateOfBirth, editedDateOfBirth) && editedDateOfBirth != null) {
    actions.push(createSetDateOfBirthAction(editedDateOfBirth));
  }

  return actions;
};

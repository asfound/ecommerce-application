export const HEADING = 'Profile';

export const NAV_ITEMS = {
  ADDRESSES: {
    ID: 'address',
    TEXT: 'Addresses',
  },
  INFORMATION: {
    ID: 'info',
    TEXT: 'Personal information',
  },
} as const;

export const TITLE = {
  BILLING: 'Billing addresses',
  PERSONAL: NAV_ITEMS.INFORMATION.TEXT,
  SHIPPING: 'Shipping addresses',
};

export const FIELD_NAME = {
  BIRTHDAY: 'Birthday:',
  EMAIL: 'Email:',
  FIRST_NAME: 'First name:',
  LAST_NAME: 'Last name:',
};

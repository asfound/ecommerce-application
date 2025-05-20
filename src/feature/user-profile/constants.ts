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

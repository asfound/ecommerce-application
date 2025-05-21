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
  PASSWORD: {
    ID: 'password',
    TEXT: 'Change password',
  },
} as const;

export const TITLE = {
  BILLING: 'Billing addresses',
  PASSWORD: NAV_ITEMS.PASSWORD.TEXT,
  PERSONAL: NAV_ITEMS.INFORMATION.TEXT,
  SHIPPING: 'Shipping addresses',
};

export const USER_NOTIFICATION = {
  INFORMATION_SUCCESS: 'Information has been successfully updated!',
  PASSWORD_SUCCESS: 'Password has been successfully updated!',
};

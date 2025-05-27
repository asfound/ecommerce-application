export const TITLE = {
  BILLING: 'Billing addresses:',
  SHIPPING: 'Shipping addresses:',
};

export const ADD_BUTTON_TEXT = {
  BILLING: '+ Add billing address',
  SHIPPING: '+ Add shipping address',
};

export const USER_NOTIFICATION = {
  CHANGE: 'Address successfully changed!',
  DELETE: 'Address successfully deleted!',
  NEW: 'Address successfully added!',
  SET_DEFAULT: 'New default address set!',
  UNSET_DEFAULT: 'Default address removed!',
};

export const ADDRESS_TRANSITION_KEY = {
  BILLING_FALSE: 'billing:false',
  BILLING_TRUE: 'billing:true',
  SHIPPING_FALSE: 'shipping:false',
  SHIPPING_TRUE: 'shipping:true',
} as const;

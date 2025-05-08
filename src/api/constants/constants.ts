export const RESPONSE_STATUS_CODE = {
  OK_MAX: 299,
  OK_MIN: 200,
} as const;

export const ACTIVE_CART_SIGNIN_MODE = {
  MERGE_WITH_EXISTING: 'MergeWithExistingCustomerCart',
  USE_AS_NEW: 'UseAsNewActiveCustomerCart',
} as const;

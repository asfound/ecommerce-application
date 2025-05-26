export const WILDCARD_ROUTE = '*';

export const ROUTER_ERROR = {
  ALREADY_INITIALIZED: 'Router is already initialized',
  NOT_INITIALIZED: 'Router is not initialized',
} as const;

export const PUSH_STATE_MODE = {
  NONE: 'none',
  PUSH: 'push',
  REPLACE: 'replace',
} as const;

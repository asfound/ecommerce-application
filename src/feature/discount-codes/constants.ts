import imageGrind from '~/assets/img/grind-code-image.jpg';
import imageHello from '~/assets/img/hello-code-image.jpg';

export const DISCOUNT_CODE_IMAGE_MAP = new Map<string, string>([
  ['GRIND-10', imageGrind],
  ['HELLO-15', imageHello],
]);

export const EVEN_CHECK_MODULO = 2;

export const IMAGE_POSITION = {
  LEFT: 'left',
  RIGHT: 'right',
} as const;

export const DISCOUNT_CODE_NOTIFICATION = {
  CODE_COPIED: (code: string): string => `Discount code "${code}" copied to clipboard`,
} as const;

export const DISCOUNT_CODE_ERROR = {
  FAILED: 'Failed to load promo codes',
} as const;

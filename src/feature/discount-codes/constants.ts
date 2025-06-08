import imageGrind from '~/assets/img/grind-code-image.jpg';
import imageHello from '~/assets/img/hello-code-image.jpg';

export const DISCOUNT_CODES_TEXT = {
  HEADING: 'Discount codes',
} as const;

export const DISCOUNT_CODE_IMAGE_MAP = new Map<string, string>([
  ['GRIND-10', imageGrind],
  ['HELLO-15', imageHello],
]);

export const EVEN_CHECK_MODULO = 2;

export const IMAGE_POSITION = {
  LEFT: 'left',
  RIGHT: 'right',
} as const;

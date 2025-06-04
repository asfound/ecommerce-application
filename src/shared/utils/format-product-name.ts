import type { AppProduct } from '~/api/services/products/types';

export const formatProductName = (product: AppProduct): string => {
  return `${product.name}, ${product.weight ?? ''}g`;
};

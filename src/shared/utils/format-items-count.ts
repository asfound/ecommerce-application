import { SINGLE_ITEM } from '~/components/cart-item/constants';

export function formatItemsCount(count: number): string {
  return `${count.toString()} ${count === SINGLE_ITEM ? 'item' : 'items'}`;
}

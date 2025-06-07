import { Navigation } from 'swiper/modules';

import type { ProductsFilterPayload } from '~/api/services/products/types';

export const PRODUCTS_FILTER_PAYLOAD: ProductsFilterPayload = {
  bestSeller: true,
  currentPage: 1,
  priceRange: {},
  productsPerPage: 100,
  sortDirection: 'asc',
  sortField: 'price',
} as const;

export const SLIDER_BESTSELLER_ERROR = {
  FAILED_TO_LOAD: 'Failed to load bestsellers',
} as const;

export const SLIDER_BESTSELLER_TEXT = {
  BEST_SELLERS: 'Best sellers',
} as const;

export const PRODUCT_QUANTITY = 1;

export const SWIPER_OPTIONS = {
  GET: (buttonNext: HTMLDivElement, buttonPrevious: HTMLDivElement) => ({
    init: false,
    initialSlide: 0,
    modules: [Navigation],
    navigation: {
      nextEl: buttonNext,
      prevEl: buttonPrevious,
    },
    observeParents: true,
    observer: true,
    slidesPerGroup: 4,
    slidesPerView: 4,
    spaceBetween: 20,
  }),
} as const;

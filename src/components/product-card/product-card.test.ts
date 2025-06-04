import { ProductCard } from './product-card';

const productCard = new ProductCard(
  {
    bestSeller: false,
    categories: [],
    description: 'test',
    image: { label: 'test', url: 'test' },
    images: [],
    inCart: true,
    name: 'test',
    price: { default: 0 },
    productId: 'test',
    productType: 'test',
    sku: 'test',
    variants: [],
    weight: 'test',
  },
  { onAddToCart: vi.fn(), onNavigateToDetails: vi.fn() },
);

test('productCard should be defined', () => {
  expect(productCard).toBeDefined();
});

test('productCard should be instance of ProductCard', () => {
  expect(productCard).toBeInstanceOf(ProductCard);
});

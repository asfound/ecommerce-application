import { ProductCard } from './product-card';

const productCard = new ProductCard(
  {
    bestSeller: false,
    description: 'test',
    image: { label: 'test', url: 'test' },
    images: [],
    name: 'test',
    price: { default: 0 },
    sku: 'test',
    variants: [],
    weight: 'test',
  },
  vi.fn(),
);

test('productCard should be defined', () => {
  expect(productCard).toBeDefined();
});

test('productCard should be instance of ProductCard', () => {
  expect(productCard).toBeInstanceOf(ProductCard);
});

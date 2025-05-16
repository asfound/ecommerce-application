import { HeroBanner } from './hero-banner';

const heroBanner = new HeroBanner();

test('heroBanner should be defined', () => {
  expect(heroBanner).toBeDefined();
});

test('heroBanner should be instance of HeroBanner', () => {
  expect(heroBanner).toBeInstanceOf(HeroBanner);
});

import { App } from './app/app';
import { normalizeError } from './shared/utils/normalize-error';
import { showToast } from './shared/utils/show-toast';
import './style/style.css';

const app = new App();

try {
  await app.initialize();
  app.mount(document.body);
} catch (error) {
  showToast(normalizeError(error).message, true);
}

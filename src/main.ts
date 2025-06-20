import { App } from './app/app';
import { FallbackUI } from './components/fallback-ui/fallback-ui';
import { normalizeError } from './shared/utils/normalize-error';
import { showToast } from './shared/utils/show-toast';
import './style/style.css';

const app = new App();

try {
  app.initializeListeners();
  await app.initialize();
  app.mount(document.body);
} catch (error) {
  showToast(normalizeError(error).message, true);

  const fallbackUI = new FallbackUI();
  document.body.append(fallbackUI.element);
}

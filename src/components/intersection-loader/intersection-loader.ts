import { BaseComponent } from '../base-component/base-component';
import { Loader } from '../common/loader/loader';
import styles from './intersection-loader.module.css';

export class IntersectionLoader extends BaseComponent {
  private readonly loader = new Loader({ size: 'medium' });

  public constructor() {
    super({ className: styles.intersectionLoader, tagName: 'div' });

    this.append(this.loader);
  }

  public hide(): void {
    this.loader.hide();
    this.addClassNames(styles.hidden);
  }

  public show(): void {
    this.loader.show();
    this.removeClassNames(styles.hidden);
  }
}

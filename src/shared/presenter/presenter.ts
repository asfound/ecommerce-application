import type { BaseComponent } from '~/components/base-component/base-component';

export abstract class Presenter<T extends BaseComponent = BaseComponent> {
  protected readonly storeSubscription = new Set<VoidFunction>();

  protected view: T;

  public constructor(view: T) {
    this.view = view;
  }

  public destroy(): void {
    for (const unsubscribe of this.storeSubscription) {
      unsubscribe();
    }

    this.storeSubscription.clear();

    this.view.destroy(); // TODO: maybe remove for prevent double call
  }

  public getView(): BaseComponent {
    return this.view;
  }
}

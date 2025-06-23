import type { ModalProperties } from './modal.view';

import { ModalView } from './modal.view';

export class ModalService {
  private readonly modalView: ModalView;

  public constructor(modalComponent: ModalView) {
    this.modalView = modalComponent;
  }

  public close(): void {
    this.modalView.close();
  }

  public getView(): HTMLElement {
    return this.modalView.element;
  }

  public open(properties: ModalProperties): void {
    this.modalView.setProperties(properties);

    this.modalView.createHTML();

    this.modalView.open();
  }
}

export const modalService = new ModalService(new ModalView());

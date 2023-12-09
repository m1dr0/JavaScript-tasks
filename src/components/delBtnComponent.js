import { AbstractComponent } from "../abstractComponent.js";

export class DelBtnComponent extends AbstractComponent {
  getTemplate() {
    return `<button class="box-del__item">Очистить</button>`;
  }
}

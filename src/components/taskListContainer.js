import { AbstractComponent } from "../abstractComponent.js";

export class ListBoardComponent extends AbstractComponent {
  getTemplate() {
    return `<section class="board-app__list"></section>`;
  }
}

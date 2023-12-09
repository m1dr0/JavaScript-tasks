import { createElement } from "./render.js";

export class AbstractComponent {
  constructor() {
    if (new.target === AbstractComponent) {
      throw new Error(`It's AbstractComponent, we dont need to create them!`);
    }
    this._element = null;
  }

  getTemplate() {
    throw new Error(`It's AbstractComponent method, please implement it! `);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}

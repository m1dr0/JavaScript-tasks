import { AbstractComponent } from "../abstractComponent.js";

export class TaskComponent extends AbstractComponent {
  constructor({ id, title, status }) {
    super();
    this._id = id;
    this._status = status;
    this._title = title;
  }

  getTemplate() {
    return `<li>${this._title}</li>`;
  }
}

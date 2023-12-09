import { AbstractComponent } from "../abstractComponent.js";

export class TaskListComponent extends AbstractComponent {
  constructor({ id, title, status }) {
    super();
    this._id = id;
    this._status = status;
    this._title = title;
  }

  getTemplate() {
    return `<div class="box ${this._status}">
      <h2>${this._status}</h2>
        <ul></ul>
  </div>`;
  }
}

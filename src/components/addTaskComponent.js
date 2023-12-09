import { AbstractComponent } from "../abstractComponent.js";

export class FormAddTaskComponent extends AbstractComponent {
  getTemplate() {
    return `<div class='addtask'>
             <h2>Новая задача</h2>
              <div class="addtask-box">
                <input type="text" placeholder="Название задачи..." id="taskInput">
                <button id="addTaskBtn">+ Добавить</button>
              </div>
              <div class="error">Поле "Название задачи" обязательно для заполнения!</div>
            </div>`;
  }

  setAddTaskHandler(handler) {
    this.getElement()
      .querySelector("#addTaskBtn")
      .addEventListener("click", (e) => {
        e.preventDefault();
        const inputElement = this.getElement().querySelector("#taskInput");
        const taskTitle = inputElement.value.trim();
        const er = document.querySelector(".error");
        if (taskTitle) {
          handler(taskTitle);
          inputElement.value = "";
          er.style.display = "none";
        } else {
          er.style.display = "block";
        }
      });
  }
}

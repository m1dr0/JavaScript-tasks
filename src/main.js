import { HeaderComponent } from "./components/headerComponent.js";
import { render, RenderPosition } from "./render.js";
import { FormAddTaskComponent } from "./components/addTaskComponent.js";
import { ListBoardComponent } from "./components/taskListContainer.js";
import { TaskComponent } from "./components/taskComponent.js";
import { TasksService } from "./service/TaskService.js";
import { Consts } from "./const.js";
import { TaskListComponent } from "./components/taskListComponent.js";
import { EmptyTasksComponent } from "./components/emptyBinComponent.js";
import { DelBtnComponent } from "./components/delBtnComponent.js";
const bodyElement = document.querySelector(".tasklist-app");
const tasksBoard = document.querySelector(".tasks-board");

render(new HeaderComponent(), bodyElement, RenderPosition.BEFOREBEGIN);

const formAddTaskComponent = new FormAddTaskComponent();
render(formAddTaskComponent, tasksBoard);

formAddTaskComponent.setAddTaskHandler((taskTitle) => {
  const newTask = { title: taskTitle };
  taskService.create(newTask);
  refreshTaskBoard();
});
function refreshTaskBoard() {
  taskBoardContainer.getElement().innerHTML = "";
  renderTaskBoard(taskService, taskBoardContainer);
}
const taskBoardContainer = new ListBoardComponent();
render(taskBoardContainer, tasksBoard);

const taskService = new TasksService();

renderTaskBoard(taskService, taskBoardContainer);

function renderTaskBoard(taskService, container) {
  Object.values(Consts.Status).forEach((status, i) => {
    const tasksByStatus = taskService.getTasksByStatus(status);

    const taskListComponent = new TaskListComponent({ status });
    render(taskListComponent, container.getElement());

    const statusLabel = Object.values(Consts.StatusLabel)[i];
    const taskListElement = taskListComponent.getElement().querySelector("h2");
    taskListElement.textContent = statusLabel;

    if (tasksByStatus.length) {
      renderTaskList(tasksByStatus, taskListComponent);
    } else {
      const emptyComponent = new EmptyTasksComponent();
      const taskListContainer = taskListComponent.getElement();
      render(emptyComponent, taskListContainer);
    }

    if (Consts.Status.DEL == status) {
      const isEmpty =
        tasksByStatus.filter((p) => p.status == Consts.Status.DEL)
          .length === 0;
      const delBtnComponent = new DelBtnComponent(taskService);

      if (!isEmpty) {
        render(
          delBtnComponent,
          taskListComponent.getElement().querySelector("ul")
        );

        document
          .querySelector(".box-del__item")
          .addEventListener("click", (e) => {
            e.target.parentElement.querySelectorAll("li").forEach((li) => {
              li.remove();
            });

            e.target.parentElement.querySelector(".box-del__item").remove();

            const emptyComponent = new EmptyTasksComponent();

            render(
              emptyComponent,
              taskListComponent.getElement().querySelector("ul")
            );
            render(
              delBtnComponent,
              taskListComponent.getElement().querySelector("ul")
            );
						e.target.classList.add("disabled");
					});
      }
    }
  });
}

function renderTaskList(tasks, taskListComponent) {
  tasks.forEach((task) => {
    const taskListContainer = taskListComponent
      .getElement()
      .querySelector("ul");
    renderTask(task, taskListContainer);
  });
}

function renderTask(task, container) {
  const taskComponent = new TaskComponent(task);
  render(taskComponent, container);
}

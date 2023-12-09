import { tasks } from "../mock/tasks.js";
import { Consts } from "../const.js";
import { generateId } from "./generateId.js";
export class TasksService {
  #boardTasks = tasks;

  getBoardTasks() {
    return this.#boardTasks;
  }

  getTasksByStatus(status) {
    return this.#boardTasks.filter((task) => task.status === status);
  }
  create(task) {
    task.id = generateId();
    task.status = Consts.Status.BACKLOG;
    this.#boardTasks.push(task);
  }
}

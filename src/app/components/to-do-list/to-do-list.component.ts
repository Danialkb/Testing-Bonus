import { Component } from '@angular/core';
import {ToDoItem} from "./models";
import {TodoListService} from "../../todo-list.service";

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css']
})
export class ToDoListComponent {
  toDoList: ToDoItem[] = [];

  constructor(private toDoService: TodoListService) { }

  ngOnInit(): void {
    this.loadToDoList();
  }

  loadToDoList(): void {
    this.toDoService.getToDoItems().subscribe(items => {
      this.toDoList = items;
    });
  }

  addToDoItem(itemTitle: string): void {
    if (!itemTitle) {
      return;
    }
    this.toDoService.addToDoItem(itemTitle).subscribe(newItem => {
      this.toDoList.push(newItem);
    });
  }

  removeToDoItem(item: ToDoItem): void {
    this.toDoService.removeToDoItem(item.id).subscribe(() => {
      this.toDoList = this.toDoList.filter(todo => todo.id !== item.id);
    });
  }

  toggleCompletion(item: ToDoItem): void {
    this.toDoService.toggleCompletion(item.id).subscribe(() => {
      item.completed = !item.completed;
    });
  }
}

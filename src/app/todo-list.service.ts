import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {ToDoItem} from "./components/to-do-list/models";

@Injectable({
  providedIn: 'root'
})
export class TodoListService {

  private mockData: ToDoItem[] = [
    { id: 1, title: '1 Task', completed: false },
    { id: 2, title: '2 Task', completed: true },
  ];

  getToDoItems(): Observable<ToDoItem[]> {
    return of(this.mockData);
  }

  addToDoItem(title: string): Observable<ToDoItem> {
    const newItem: ToDoItem = { id: this.mockData.length + 1, title, completed: false };
    this.mockData.push(newItem);
    return of(newItem);
  }

  removeToDoItem(id: number): Observable<void> {
    this.mockData = this.mockData.filter(item => item.id !== id);
    return of();
  }

  toggleCompletion(id: number): Observable<void> {
    const item = this.mockData.find(item => item.id === id);
    if (item) {
      item.completed = !item.completed;
    }
    return of();
  }
}

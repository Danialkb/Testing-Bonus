import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoListComponent } from './to-do-list.component';
import {TodoListService} from "../../todo-list.service";
import {of} from "rxjs";

describe('ToDoListComponent', () => {
  let component: ToDoListComponent;
  let fixture: ComponentFixture<ToDoListComponent>;
  let mockToDoService: jasmine.SpyObj<TodoListService>;

  beforeEach(() => {
    mockToDoService = jasmine.createSpyObj('ToDoService', ['getToDoItems', 'addToDoItem', 'removeToDoItem', 'toggleCompletion']);
    mockToDoService.getToDoItems.and.returnValue(of([
      { id: 1, title: 'Test Task 1', completed: false },
      { id: 2, title: 'Test Task 2', completed: true }
    ]));

    TestBed.configureTestingModule({
      declarations: [ ToDoListComponent ],
      providers: [{ provide: TodoListService, useValue: mockToDoService }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToDoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();


  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load items', () => {
    expect(component.toDoList.length).toBe(2);
    expect(component.toDoList[0].title).toBe('Test Task 1');
  });

  it('should add item', () => {
    const newItem = { id: 3, title: 'New Task', completed: false };
    mockToDoService.addToDoItem.and.returnValue(of(newItem));

    component.addToDoItem('New Task');
    fixture.detectChanges();

    expect(component.toDoList.length).toBe(3);
    expect(component.toDoList[2].title).toBe('New Task');
  });

  it('should remove item', () => {
    const itemToRemove = component.toDoList[0];
    mockToDoService.removeToDoItem.and.returnValue(of(undefined));

    component.removeToDoItem(itemToRemove);
    fixture.detectChanges();

    expect(component.toDoList.length).toBe(1);
  });

  it('should toggle completion status', () => {
    const itemToToggle = component.toDoList[0];
    mockToDoService.toggleCompletion.and.returnValue(of(undefined));

    component.toggleCompletion(itemToToggle);
    fixture.detectChanges();

    expect(itemToToggle.completed).toBeTrue();
  });

});

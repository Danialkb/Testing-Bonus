import { TestBed } from '@angular/core/testing';

import { TodoListService } from './todo-list.service';

describe('TodoListService', () => {
  let service: TodoListService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TodoListService],
    });
    service = TestBed.inject(TodoListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve items', () => {
    service.getToDoItems().subscribe(items => {
      expect(items.length).toBeGreaterThan(0);
    });
  });

  it('should add a new item', () => {
    service.addToDoItem('New Task').subscribe(item => {
      expect(item.title).toBe('New Task');
      expect(item.completed).toBeFalse();
    });
  });

  it('should remove item', () => {
    service.addToDoItem('Task to remove').subscribe(addedItem => {
      service.removeToDoItem(addedItem.id).subscribe(() => {
        service.getToDoItems().subscribe(items => {
          expect(items.find(item => item.id === addedItem.id)).toBeUndefined();
        });
      });
    });
  });

  it('should toggle status of item', () => {
    service.addToDoItem('Toggle Task').subscribe(item => {
      service.toggleCompletion(item.id).subscribe(() => {
        expect(item.completed).toBeTrue();
      });
    });
  });
});

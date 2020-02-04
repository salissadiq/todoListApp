import { TodoService } from './shared/todo.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: "app-todo",
  templateUrl: "./todo.component.html",
  styleUrls: ["./todo.component.scss"],
  providers: [TodoService]
})
export class TodoComponent implements OnInit {
  toDoListArray: any[];
  constructor(private todoservice: TodoService) {}

  ngOnInit() {
    this.todoservice
      .getToDoList()
      .snapshotChanges()
      .subscribe(item => {
        console.log(item);
        this.toDoListArray = [];
        item.forEach(element => {
          var x = element.payload.toJSON();
          x["$key"] = element.key;
          this.toDoListArray.push(x);
        });

        this.toDoListArray.sort((a, b) => {
          return a.isChecked - b.isChecked;
        });
      });
  }
  onAdd(itemTitle) {
    this.todoservice.addTodo(itemTitle.value);
    itemTitle.value = null;
  }
  alterCheck($key: string, isChecked) {
    this.todoservice.checkOrUnCheckTitle($key, !isChecked);
  }

  onDelete($key: string) {
    this.todoservice.removeTitle($key);
  }
}

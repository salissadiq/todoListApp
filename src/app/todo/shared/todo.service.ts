import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList} from 'angularfire2/database';
@Injectable({
  providedIn: "root"
})
export class TodoService {
  toDoList: AngularFireList<any>;
  constructor(private firebasedb: AngularFireDatabase) {}

  getToDoList() {
    this.toDoList = this.firebasedb.list("title");
    return this.toDoList;
  }
  addTodo(title: string) {
    this.toDoList.push({
      title,
      isChecked: false
    });
  }
  checkOrUnCheckTitle($key: string, flag: boolean) {
    this.toDoList.update($key, { isChecked: flag });
  }

  removeTitle($key) {
    this.toDoList.remove($key);
  }
}

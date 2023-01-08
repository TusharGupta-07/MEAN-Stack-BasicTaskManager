import { Injectable } from '@angular/core';
import { WebService } from './web.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private webService: WebService) { }
  //All API calls for List
  getAllList() {
    return this.webService.get('lists');
  }

  createNewList() {
    return this.webService.post('lists', "");
  }

  updateListTitle(title: string, _id: string) {
    return this.webService.patch(`lists/${_id}`,{title})
  }

  deleteListById(_id:string)
  {
    return this.webService.delete(`lists/${_id}`)
  }
  //----------------------List

  //All API calls for Task
  getTaskById(_listId: string) {
    return this.webService.get(`lists/${_listId}/tasks`);
  }

  createNewTask(_listId: string) {
    return this.webService.post(`lists/${_listId}/tasks/`,"");
  }

  DeleteAllTask(_listId: string) {
    return this.webService.delete(`lists/${_listId}/tasks`);
  }

  DeleteTaskById(_listId: string, _id: string) {
    return this.webService.delete(`lists/${_listId}/tasks/${_id}`);
  }

  updateTaskTitle(title: string, _listId: string, _id: string) {
    return this.webService.patch(`lists/${_listId}/tasks/${_id}`, { title });
  }

  taskCompletedOrNot(completed: string, _listId: string, _id: string) {
    return this.webService.patch(`lists/${_listId}/tasks/${_id}`, { completed });
  }

  //-----------------------Task



}

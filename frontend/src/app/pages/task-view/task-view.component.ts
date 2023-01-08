import { isNgTemplate } from '@angular/compiler';
import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import List from 'src/app/models/list';
import Task from 'src/app/models/task';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent {
  lists: List[] = [
  ];
  tasks: Task[] = [];
  id: any;
  startId? : string = "";
  isEdit = false;
  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router,
    private cd: ChangeDetectorRef
  ) { }
  ngOnInit() {

    //getting all the List from database, 
    //subscribe -> it is used for storing and converting the received data, 
    //it is called after the successfull http response.
    
    this.taskService.getAllList()
      .subscribe((lists: any) => {
        this.lists = lists; 

        this.startId = this.lists.at(0)?._id;
        this.route.params.subscribe((params: any) => {

          // console.log(params.listId);
          this.id = params.listId;
          this.taskService.getTaskById(params.listId).subscribe((tasks: any) => this.tasks = tasks);
        })
       
        
         if (!this.id) {
          this.taskService.getTaskById(this.startId!).subscribe((tasks: any) => this.tasks = tasks);
          this.router.navigate([`lists/${this.startId!}`]);
        }
        
        
        
           

      });
    



  }

  //Deletion of list by id

  deleteList(listId: string) {
    //.subscribe((data: any) => console.log(data));
    this.taskService.deleteListById(listId).subscribe((data: any) => {
      console.log(data); this.lists = this.lists.filter(l => l._id != data._id)

      //after deleting list the task associated with the list need to be deleted
      this.taskService.DeleteAllTask(listId).subscribe((data: any) => { console.log(data); this.lists = this.lists.filter(l => l._id != data._id) });
      //if(this.tasks.length == 0)
      this.router.navigate(['/'])
    });



  }


  //Deletion of task by id

  deleteTask(_listId: string, _id: string) {
    this.taskService.DeleteTaskById(_listId, _id).subscribe((data: any) => { console.log(data); this.tasks = this.tasks.filter(l => l._id != data._id) });

  }

  //add new task
  addNewTask() {    
      this.taskService.createNewTask(this.id).subscribe((data: any) => { console.log(data); 
        this.ngOnInit();
      });
        
  }

  //add new list
  addNewList() {
    var newListId;
    this.taskService.createNewList().subscribe((data: any) => { console.log(data); 
    newListId = data._id;
    this.ngOnInit();
    this.router.navigate([`lists/${newListId}`]);
 
    });




  }


  //Edit list Title
  EditListTitle(list: any) {
    this.lists.forEach(element => {
      element.isEdit = false;
    });
    list.isEdit = true;

    console.log("enabled");
  }
  onEnterEditList(list: any) {
    this.lists.forEach(element => {
      element.isEdit = false;
    });
    list.isEdit = false;
    console.log(list.title);
    this.taskService.updateListTitle(list.title, list._id).subscribe((data: any) => console.log(data));

  }
  //-----------

  //Edit task Title
  EditTaskTitle(task: any) {
    this.tasks.forEach(element => {
      element.isEdit = false;
    });
    task.isEdit = true;

    console.log("enabled");
  }
  onEnterEditTask(task: any) {
    this.tasks.forEach(element => {
      element.isEdit = false;
    });
    task.isEdit = false;
    console.log(task.title);
    this.taskService.updateTaskTitle(task.title, task._listId, task._id).subscribe((data: any) => console.log(data));

  }
  //-----------

  //task completed
  taskCompleted(taskId : any)
  {
    this.taskService.taskCompletedOrNot("true", this.id, taskId).subscribe((data:any) => {
      this.tasks = data;
      console.log(data);
      this.ngOnInit();

    });
  }

  taskInCompleted(taskId:any)
  {
    this.taskService.taskCompletedOrNot("false", this.id, taskId).subscribe((data:any) => {
      this.tasks = data;
      console.log(data);
      this.ngOnInit();

    });
  }
}

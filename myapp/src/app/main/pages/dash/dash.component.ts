import { HttpClient } from '@angular/common/http';
import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.sass']
})
@Injectable()
export class DashComponent implements OnInit {
  tasks:Task[]  =[]
  weather:any;
  constructor(public http : HttpClient,public dialog: MatDialog,) { }

  ngOnInit(): void {
    this.getTasks();
    this.getWeather();
  }

  // get task list from server
  getTasks(){
    this.http.get("http://127.0.0.1:8000/myapp/task/").subscribe(
      (data:any)=>{
        this.tasks=[];
        data.forEach((element:any) => {
          this.tasks.push(Task.fromJson(element));
 
        } );
      }
    )
  }

  getCount(){
    return this.tasks.length;
  }

  getCompletedCount(){
    let count = 0;
    this.tasks.forEach((element) => {
      if(element.completed){
        count++;
      }
    }); 
    return count;
  }

  delete(id:number){
    this.http.delete("http://127.0.0.1:8000/myapp/task/"+id).subscribe(result=>{
      this.tasks = this.tasks.filter(task=>task.id!=id);
    }  );
  }

  createTask(){
    const dialogRef = this.dialog.open(CreateTaskDialog, {
      width: '500px',
   
    });
    dialogRef.afterClosed().subscribe(result => {
      
       this.getTasks();
     
    });
  }

  editTask(task:Task){
    const dialogRef = this.dialog.open(EditTaskDialog, {
      width: '500px',
      data:task
    });
    dialogRef.afterClosed().subscribe(result => {
      
       this.getTasks();
     
    });
  }

  getWeather(){
    // get weather from openweathermap.org by zipcode
    // https://openweathermap.org/current
    this.http.get("http://api.openweathermap.org/data/2.5/weather?zip=47904,us&appid=7075a940e0b92f57165ee91f7a1d63be").subscribe(
      (data:any)=>{
        console.log(data);
      }
    ) }



 

}




// class Task(models.Model):
//     name = models.CharField(max_length=50)
//     description = models.TextField()
//     date_created = models.DateTimeField(auto_now_add=True)
//     date_modified = models.DateTimeField(auto_now=True)
//     completed = models.BooleanField(default=False)
//     detection_model = models.CharField(max_length=50)
//     data_type = models.CharField(max_length=50)

export class Task {
    id:number;
    name: string | undefined;
    description: string | undefined;
    date_created: Date | undefined;
    date_modified: Date | undefined;
    completed: boolean | undefined;
    detection_model: string | undefined;
    data_type: string | undefined;

    constructor(id:number,name: string, description: string, date_created: Date, date_modified: Date, completed: boolean, detection_model: string, data_type: string) {
      this.id = id;  
      this.name = name;
        this.description = description;
        this.date_created = date_created;
        this.date_modified = date_modified;
        this.completed = completed;
        this.detection_model = detection_model;
        this.data_type = data_type;
    
    }

    static  fromJson(json: any): Task {
        return new Task(json.id,json.name, json.description, json.date_created, json.date_modified, json.completed, json.detection_model, json.data_type);
    }
}


@Component({
  selector: 'createtask',
  template:
  `
  <style>
  .create-form {
    min-width: 300px;
    max-width: 500px;
    width: 100%;
  }
  .full-width {
    width: 100%;
  }
  </style>
  <h1 mat-dialog-title>Create Task</h1> 
  <div mat-dialog-content>
    <form class="create-form">
    <mat-form-field class="full-width" required>
      <input matInput placeholder="Task Name" name="name" [(ngModel)]="task.name">
    </mat-form-field>
    <mat-form-field class="full-width">
      <input matInput placeholder="Description" name="description" [(ngModel)]="task.description">
    </mat-form-field>
    <mat-form-field class="full-width">
      <input matInput placeholder="Detection Model" name="detection_model" [(ngModel)]="task.detection_model">
    </mat-form-field>
    <mat-form-field class="full-width">
      <input matInput placeholder="Data Type"  name="data_type"[(ngModel)]="task.data_type">
    </mat-form-field>  
    </form>
  </div>

  <div mat-dialog-actions>
    <button mat-button   (click)="create()">Create</button>
    <button mat-button [mat-dialog-close]="false">Cancel</button>
  </div>
 
  `
})
@Injectable()
export class CreateTaskDialog {
  task:Task = new Task(0,"","",new Date,new Date,false,"","");
  constructor(public http:HttpClient,
    public dialogRef: MatDialogRef<CreateTaskDialog>,  @Inject(MAT_DIALOG_DATA) public data: boolean,
  ) {}

  create(){
this.http.post("http://127.0.0.1:8000/myapp/task/",this.task).subscribe(result=>{
  console.log(result);
  this.dialogRef.close();
},error=>{
  alert("Create Task Failed, Make sure you have filled all the fields");
})
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}



@Component({
  selector: 'createtask',
  template:
  `
  <style>
  .create-form {
    min-width: 300px;
    max-width: 500px;
    width: 100%;
  }
  .full-width {
    width: 100%;
  }
  </style>
  <h1 mat-dialog-title>Create Task</h1> 
  <div mat-dialog-content>
    <form class="create-form">
    <mat-form-field class="full-width" required>
      <input matInput placeholder="Task Name" name="name" [(ngModel)]="task.name">
    </mat-form-field>
    <mat-form-field class="full-width">
      <input matInput placeholder="Description" name="description" [(ngModel)]="task.description">
    </mat-form-field>
    <mat-form-field class="full-width">
      <input matInput placeholder="Detection Model" name="detection_model" [(ngModel)]="task.detection_model">
    </mat-form-field>
    <mat-form-field class="full-width">
      <input matInput placeholder="Data Type"  name="data_type"[(ngModel)]="task.data_type">
    </mat-form-field>  
    </form>
  </div>

  <div mat-dialog-actions>
    <button mat-button   (click)="create()">Save</button>
    <button mat-button [mat-dialog-close]="false">Cancel</button>
  </div>
 
  `
})
@Injectable()
export class EditTaskDialog {
  task:Task = new Task(0,"","",new Date,new Date,false,"","");
  constructor(public http:HttpClient,
    public dialogRef: MatDialogRef<EditTaskDialog>,  @Inject(MAT_DIALOG_DATA) public data: Task,
  ) {
    this.task = data;
  }

  create(){
this.http.put("http://127.0.0.1:8000/myapp/task/"+this.task.id+'/',this.task).subscribe(result=>{
  console.log(result);
  this.dialogRef.close();
},error=>{
  alert("Update Task Failed, Make sure you have filled all the fields");
})
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
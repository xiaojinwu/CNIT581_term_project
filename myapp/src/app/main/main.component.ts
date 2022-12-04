import { HttpClient } from '@angular/common/http';
import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass']
})
@Injectable()
export class MainComponent implements OnInit {

  constructor(public http:HttpClient,public dialog: MatDialog,public router:Router) { }

  ngOnInit(): void {
  }

  logout(){
    // pop up a dialog to confirm
    // remove JWT from local storage
    // redirect to login page
    const dialogRef = this.dialog.open(ConfirmDialog, {
      width: '250px',
   
    });
    dialogRef.afterClosed().subscribe(result => {
     if(result){
      localStorage.removeItem("jwt");
      this.router.navigate(['/Account']);
     }
    });


     
  }

}


@Component({
  selector: 'dialog-overview-example-dialog',
  template:
  `
  <h1 mat-dialog-title>Confirm</h1>
  <div mat-dialog-content>

    <p>Are you sure to logout?</p>
  </div>
  <div mat-dialog-actions>
    <button mat-button [mat-dialog-close]="true">Yes</button>
    <button mat-button [mat-dialog-close]="false">No</button>
  </div>
 
  `
})
export class ConfirmDialog {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialog>,  @Inject(MAT_DIALOG_DATA) public data: boolean,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
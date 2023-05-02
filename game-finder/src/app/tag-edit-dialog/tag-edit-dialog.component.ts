import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-tag-edit-dialog',
  templateUrl: './tag-edit-dialog.component.html',
  styleUrls: ['./tag-edit-dialog.component.css']
})
export class TagEditDialogComponent {
  constructor( 
    public dialogRef: MatDialogRef<TagEditDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any
  ){}
  
  onNoClick(): void {
    this.dialogRef.close();
  }
  

  ok(): void {
    //do smth
    this.dialogRef.close();
  }

  cancel(): void {
    //do smth
    this.dialogRef.close();
  }
}

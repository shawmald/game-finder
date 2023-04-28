import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StatUtil } from 'src/backend/StatUtil';

@Component({
  selector: 'app-npc-dialog',
  templateUrl: './npc-dialog.component.html',
  styleUrls: ['./npc-dialog.component.css']
})
export class NpcDialogComponent {
  statTool: StatUtil = new StatUtil();
  editing: boolean = false;
  
  constructor( 
    public dialogRef: MatDialogRef<NpcDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any
  ){}
  
  onNoClick(): void {
    this.dialogRef.close();
  }

  edit(){
    this.editing = true;
  }
  

  save(): void {
    //do smth
    //this.dialogRef.close();
    this.editing = false;
  }

  cancel(): void {
    //do smth
    //this.dialogRef.close();
    this.editing = false;
  }
}

import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-tag-edit-dialog',
  templateUrl: './tag-edit-dialog.component.html',
  styleUrls: ['./tag-edit-dialog.component.css']
})
export class TagEditDialogComponent {

  currentData!: Map<string, boolean>;
  currentTags!: Map<string, boolean>;

  currentUser!: string;
  ip = "http://34.30.183.36:80/";

  ngOnInit() {
    this.currentUser = sessionStorage.getItem('currentUser') as string;

    fetch(this.ip + "ReturnProfileVar?Username=" + this.currentUser
    + "&ReqVar=" + "tags", {
      method: "GET",
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    })
    .then((content) => {
      this.currentData = new Map(Object.entries(JSON.parse(content)));
      console.log(this.currentData)
    })
    .catch((error) => {
      console.error('Error:',error);
    })

    this.currentTags = new Map(this.data.tags);
  }

  constructor(
    public dialogRef: MatDialogRef<TagEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){}

  toggleTag(tag: string) {
    this.data.tags.set(tag, !this.data.tags.get(tag));
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  ok(): void {
    // save Tags

    fetch(this.ip + "SetProfileVar?Username=" + this.currentUser
    + "&ReqVar=" + "tags"
    + "&NewVar=" + JSON.stringify(Object.fromEntries(this.data.tags)), {
      method: "GET",
    })
    .catch((error) => {
      console.error('Error:', error);
    })

    this.currentTags = new Map(this.data.tags)

    this.dialogRef.close();
  }

  cancel(): void {
    //do smth
    this.data.tags = new Map(this.currentTags);
    this.dialogRef.close();
  }
}

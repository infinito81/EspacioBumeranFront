import { Component, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {

  title: string;
  subtitle: string;
  sourceImage: ArrayBuffer;
  altImage: string;
  description: string;

  constructor(@Inject(MAT_DIALOG_DATA) public info : any) { 
    this.title = info.title;
    this.subtitle = info.subtitle;
    this.sourceImage = info.sourceImage;
    this.altImage = info.altImage;
    this.description = info.description;
  }






}

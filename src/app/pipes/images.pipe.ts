import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imagespipe'
})
export class ImagesPipe implements PipeTransform {

  transform(imageBytes: string): string {
    //alert(imageBytes);
     if (imageBytes != null){
       
        return "data:image/jpg;base64," + imageBytes;
      } else {
        return 'assets/images/add.png';
      }      
  }

}
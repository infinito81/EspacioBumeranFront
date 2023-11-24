import { Course } from 'src/app/models/academy/course.model';
import { CoursesService } from 'src/app/providers/academy/courses.service';
import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import { AuthService } from 'src/app/providers/auth.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  mobileQuery: MediaQueryList;
  userName : string = "";

  private _mobileQueryListener: () => void;

  courses! : Course [];
  constructor(private coursesService : CoursesService, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private authService: AuthService){
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.userName = authService.getUserName() + "";
  }

  ngOnInit(): void {
      this.coursesService.getUserCourses().subscribe( (resp:any) => {
        console.log(resp);
        this.courses = resp;
      } ,(err) =>{

        console.error(err);
      }); 
  }
}

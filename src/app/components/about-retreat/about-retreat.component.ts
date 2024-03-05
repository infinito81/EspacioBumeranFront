import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-about-retreat',
  templateUrl: './about-retreat.component.html',
  styleUrls: ['./about-retreat.component.css']
})
export class AboutRetreatComponent implements AfterViewInit{
  ngAfterViewInit(): void {
    (window as any).contentWayPoint();
  }

}

import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-soyana',
  templateUrl: './soyana.component.html',
  styleUrls: ['./soyana.component.css']
})
export class SoyanaComponent implements AfterViewInit {
  ngAfterViewInit(): void {
    (window as any).contentWayPoint();
  }
}

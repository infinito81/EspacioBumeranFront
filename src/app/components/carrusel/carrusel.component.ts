import { Component, AfterViewInit, OnDestroy } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-carrusel',
  templateUrl: './carrusel.component.html',
  styleUrls: ['./carrusel.component.css']  // Puedes eliminar esta línea si no hay estilos específicos
})
export class CarruselComponent implements AfterViewInit, OnDestroy {

  images: string[] = ['carousel-1.jpg', 'carousel-2.jpg', 'carousel-1.jpg'];

  getImagePath(imageName: string): string {
    return `../../assets/img/${imageName}`;
  }

  ngAfterViewInit() {
    $(document).ready(() => {
      $('.owl-carousel').owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        items: 1,
        dots: true,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ]
      });
    });
  }

  ngOnDestroy() {
    $(document).ready(() => {
      $('.owl-carousel').owlCarousel('destroy');
    });
  }
}
import { Component, AfterViewInit, OnDestroy } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-carrusel',
  templateUrl: './carrusel.component.html',
  styleUrls: ['./carrusel.component.css']  // Puedes eliminar esta línea si no hay estilos específicos
})
export class CarruselComponent implements AfterViewInit, OnDestroy {

  images: string[] = ['mujeres_desayunando.jpg', 'medina_mudejar.jpg', 'mujeres_desayunando.jpg'];

  getImagePath(imageName: string): string {
    return `../../assets/img/${imageName}`;
  }

  ngAfterViewInit() {
    (window as any).contentWayPoint();

    $(document).ready(() => {
      $('.owl-carousel').owlCarousel({
        autoplay: true,
        smartSpeed: 2000,
        items: 1,
        dots: true,
        loop: true,
        nav : true
      });
    });
  }

  ngOnDestroy() {
    $(document).ready(() => {
      $('.owl-carousel').owlCarousel('destroy');
    });
  }
}
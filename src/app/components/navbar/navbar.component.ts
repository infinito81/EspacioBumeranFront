import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  select(tab: string) {
    // Lógica para manejar la selección de pestañas
    console.log(`Seleccionado: ${tab}`);
  }
}

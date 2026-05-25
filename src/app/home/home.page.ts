import { Component } from '@angular/core';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  //Arreglo de tareas

  tasks: Task[] = [
    {
      id: 1,
      titulo: 'Configuración de ionic',
      descripcion: 'Instalar Node.js, AngularCli, IonicCli',
      finalizado: true,
      prioridad: 'Alta',
    },
    {
      id: 2,
      titulo: 'Crear app tasklist',
      descripcion: 'Crear el proyecto inicial de task list',
      finalizado: false,
      prioridad: 'Alta',
    },
  ];
  constructor() {
    console.log(this.tasks);
  }

  saludar() {
    console.log('Este es mi primer botón');
  }
}

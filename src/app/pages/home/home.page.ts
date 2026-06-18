import { Component } from '@angular/core';
import Task from '../../models/task.model';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonInput,
  IonItem,
  IonButton,
  IonIcon,
} from '@ionic/angular/standalone'
import { addIcons } from 'ionicons';
import { addOutline } from 'ionicons/icons'
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonInput,
    IonItem,
    IonButton,
    IonIcon,
    FormsModule,
  ]
})
export class HomePage {
  //Arreglo de tareas

  newTaskStr: string = '';

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
    addIcons({
      addOutline
    });
    console.log(this.tasks);
  }

  addTask(): void {
    if (!this.newTaskStr.trim()) {
      console.log("No pusiste nada");
      return;
    }

    if (
      this.tasks.find(
        (t) => t.titulo.toLowerCase() == this.newTaskStr.toLowerCase(),
      )
    ) {
      console.log('Ya existe esa tarea');
      return;
    }

    this.newTaskStr = this.newTaskStr.trim();

    console.log(this.newTaskStr);

    const newTask: Task = {
      id: Date.now(),
      titulo: this.newTaskStr,
      descripcion: '',
      finalizado: false,
      prioridad: 'Media',
    };

    this.tasks.push(newTask);
    console.log(this.tasks);

    this.newTaskStr = "";
  }
}

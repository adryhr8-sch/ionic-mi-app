import { Component, inject } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonItem, IonButton, IonIcon, IonList, IonLabel, IonItemSliding, IonItemOptions, IonItemOption, IonReorderGroup, IonReorder } from '@ionic/angular/standalone'
import { addIcons } from 'ionicons';
import { addOutline, trashOutline } from 'ionicons/icons'
import { FormsModule } from '@angular/forms';
import { Alert } from '../../alert';
import { ReorderEndCustomEvent } from '@ionic/angular/standalone';
import { Preferences } from '@capacitor/preferences';

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
    IonList,
    IonLabel,
    IonItemSliding,
    IonItemOptions,
    IonItemOption,
    IonReorderGroup,
    IonReorder
]
})
export class HomePage {
  public task: string = "";
  public tasks: string[] = [];
  private readonly KEY_TASK = 'local_key_task';

  public alertService: Alert = inject(Alert);

  constructor() {
    addIcons({
      addOutline,
      trashOutline,
    });
  }

  issame() {
    return this.tasks.map((t) => t.toLowerCase()).includes(this.task.toLowerCase());
  }

  addTask() {
    this.tasks.push(this.task);
    console.log(this.tasks);
    this.alertService.showAlert('Éxito', 'Tarea agregada');
    this.task = "";
    this.saveTaskOnLocal();
  }

  confirmDelete(task: string) {
    console.log(`Confirmación para borrar task: ${task}`);
    this.alertService.confirmAlert(
      'Aviso',
      `Desea borrar la tarea ${task}`,
      'SI',
      'NO',
      () => this.deleteTask(task),
    )
  }

  private deleteTask(taskRemove: string) {
    let index = this.tasks.findIndex(task => task === taskRemove);
    this.tasks.splice(index, 1);
    this.saveTaskOnLocal();
  }

  actualizarPosiciones(event: ReorderEndCustomEvent) {
    console.log("El arreglo antes del cambio:", this.tasks);
    this.tasks = event.detail.complete(this.tasks);
    console.log("El arreglo después del cambio:", this.tasks);
  }

  async ionViewWillEnter() {
    const taskPreferences = await Preferences.get({key: this.KEY_TASK});

    if (taskPreferences.value) {
      const tasks = JSON.parse(taskPreferences.value);
      if (Array.isArray(tasks)) {
        this.tasks = tasks;
      }
    }
  }

  saveTaskOnLocal() {
    Preferences.set(
      {
        key: this.KEY_TASK,
        value: JSON.stringify(this.tasks),
      }
    );
  }
}
